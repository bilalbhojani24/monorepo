import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Pagination } from '@browserstack/bifrost';

import { getConfigurationsThunk, getLogsThunk } from '../../../api';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  filtersSelector,
  logsLoadingSelector,
  logsSelector
} from '../../../globalSlice';
import {
  getCleanedConfigurationIds,
  getFiltersPayload,
  getUnixDate
} from '../../../utils/helpers';
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
    const cleanedFiltersPayload = getFiltersPayload(filters);
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
      <div className="mx-8 rounded-md bg-white p-6 drop-shadow">
        <p className="mb-3 text-lg font-semibold text-black">Logs Details</p>
        <LogsTable logsData={logsData} getLogs={getLogs} />
        {logsDataloadedWithNoLogsToRender && (
          <p className="text-base-500 mt-3">No Logs Available</p>
        )}
      </div>
      {!logsDataloadedWithNoLogsToRender && (
        <div className="px-8 py-6 text-xs">
          <Pagination
            onNextClick={handlePageChange}
            onPageNumberClick={handlePageChange}
            onPreviousClick={handlePageChange}
            pageNumber={logsData.page_number}
            pageSize={logsData.page_size}
            count={logsData.total_logs}
          />
          <p className="text-base-500">Your data is retained for 6 months</p>
        </div>
      )}
      <LogDetails />
      <FilterSlideover />
    </div>
  );
};
export default Logs;
