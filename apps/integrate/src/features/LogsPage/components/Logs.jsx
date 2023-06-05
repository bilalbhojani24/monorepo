import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getConfigurationsThunk, getLogsThunk } from 'api/index';
import { INTGPagination } from 'common/bifrostProxy';
import { LOADING_STATUS } from 'constants/loadingConstants';
import {
  activeConfigurationsSelector,
  FILTER_KEY,
  filtersSelector,
  logsLoadingSelector,
  logsSelector
} from 'globalSlice/index';
import {
  getCleanedConfigurationIds,
  getFiltersPayload,
  getUnixDate
} from 'utils/helpers';

import { LOGS_PAGE_LOGS_TABLE_PAGE_SIZE } from '../constants';

import FilterSlideover from './Filters/FiltersSlideover';
import LogDetails from './LogDetails';
import LogsHeader from './LogsHeader';
import LogsTable from './LogsTable';

const Logs = () => {
  const filters = useSelector(filtersSelector);
  const logsData = useSelector(logsSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getConfigurationsThunk());
  }, [dispatch]);
  const activeConfigurationsIds = getCleanedConfigurationIds(
    useSelector(activeConfigurationsSelector)
  );

  const getLogs = useCallback(() => {
    const cleanedFiltersPayload = getFiltersPayload({
      ...filters,
      [FILTER_KEY.DATE]: getUnixDate(filters[FILTER_KEY.DATE])
    });

    dispatch(
      getLogsThunk({
        ...cleanedFiltersPayload,
        pageSize: LOGS_PAGE_LOGS_TABLE_PAGE_SIZE
      })
    );
  }, [dispatch, filters]);

  useEffect(() => {
    getLogs(filters);
  }, [filters, getLogs]);

  const handlePageChange = (pageToLoad) => {
    if (logsData.page_number !== pageToLoad) {
      const cleanedFiltersPayload = getFiltersPayload({
        ...filters,
        date: getUnixDate(filters.date)
      });
      dispatch(
        getLogsThunk({
          ...cleanedFiltersPayload,
          page: pageToLoad,
          pageSize: LOGS_PAGE_LOGS_TABLE_PAGE_SIZE,
          configurationIds: activeConfigurationsIds
        })
      );
    }
  };
  const logsDataloadedWithNoLogsToRender =
    useSelector(logsLoadingSelector) === LOADING_STATUS.SUCCEEDED &&
    !logsData?.logs?.length;

  return (
    <div className="h-full">
      <LogsHeader />
      <div className="mx-6 rounded-md bg-white p-6 drop-shadow">
        <p className="mb-3 text-lg font-semibold text-black">Logs Details</p>
        <LogsTable logsData={logsData} getLogs={getLogs} />
        {logsDataloadedWithNoLogsToRender && (
          <p className="text-base-500 mt-3">No Logs Available</p>
        )}
      </div>
      {!logsDataloadedWithNoLogsToRender && (
        <div className="p-6 text-xs">
          <INTGPagination
            onNextClick={handlePageChange}
            onPageNumberClick={handlePageChange}
            onPreviousClick={handlePageChange}
            pageNumber={logsData.page_number}
            pageSize={LOGS_PAGE_LOGS_TABLE_PAGE_SIZE}
            count={logsData.total_logs}
          />
          <p className="text-base-500 px-6">
            Your data is retained for 6 months
          </p>
        </div>
      )}
      <LogDetails />
      <FilterSlideover />
    </div>
  );
};
export default Logs;