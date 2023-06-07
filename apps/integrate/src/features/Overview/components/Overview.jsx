import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowForward } from '@browserstack/bifrost';
import { getConfigurationsThunk, getLogsThunk } from 'api/index';
import { INTGLoader } from 'common/index';
import { LOADING_STATUS } from 'constants/loadingConstants';
import { LogDetails, LogsTable } from 'features/LogsPage';
import RequestsChart from 'features/RequestsChart';
import UsageSummary from 'features/UsageSummary';
import UsageSummaryDetails from 'features/UsageSummary/components/UsageSummaryDetails';
import {
  activeConfigurationsSelector,
  closeUsageSummarySlideover,
  configurationsLoadingSelector,
  logsLoadingSelector,
  logsSelector
} from 'globalSlice/index';
import { omit } from 'lodash';
import { getCleanedConfigurationIds } from 'utils/helpers';

import { OVERVIEW_PAGE_LOGS_TABLE_PAGE_SIZE } from '../constants';

import OverviewHeader from './OverviewHeader';
import QuickLinks from './QuickLinks';

const Overview = () => {
  const dispatch = useDispatch();
  const logsData = useSelector(logsSelector);
  const cleanedActiveConfigurationId = getCleanedConfigurationIds(
    useSelector(activeConfigurationsSelector)
  );

  const getLogs = useCallback(() => {
    const requestPayload = {
      ...omit({ configurations: cleanedActiveConfigurationId }, [
        !cleanedActiveConfigurationId.length ? 'configurations' : ''
      ]),
      pageSize: OVERVIEW_PAGE_LOGS_TABLE_PAGE_SIZE
    };
    dispatch(getLogsThunk(requestPayload));
  }, [cleanedActiveConfigurationId, dispatch]);

  useEffect(() => {
    dispatch(getConfigurationsThunk());
    getLogs();
    return () => {
      dispatch(closeUsageSummarySlideover());
    };
  }, [dispatch, getLogs]);
  const logsDataloadedWithNoLogsToRender =
    useSelector(logsLoadingSelector) === LOADING_STATUS.SUCCEEDED &&
    !logsData?.logs?.length;

  const activeConfigurations = useSelector(activeConfigurationsSelector);
  const areConfigurationsLoading =
    useSelector(configurationsLoadingSelector) === LOADING_STATUS.PENDING;
  const areConfigurationsLoaded =
    useSelector(configurationsLoadingSelector) === LOADING_STATUS.SUCCEEDED &&
    Boolean(activeConfigurations.length);
  return (
    <div className="h-full">
      <OverviewHeader />
      {areConfigurationsLoading && <INTGLoader wrapperClassName="h-full" />}
      {areConfigurationsLoaded && (
        <>
          <div className="flex flex-col gap-y-5 px-6">
            <div className="flex flex-col gap-y-5 lg:gap-x-5 xl:flex-row">
              <RequestsChart />
              <UsageSummary />
            </div>
            <div className="rounded-md bg-white drop-shadow">
              <div className="p-6">
                <p className="mb-3 text-lg font-semibold text-black">
                  Recent Logs
                </p>
                <LogsTable logsData={logsData} getLogs={getLogs} />
                {logsDataloadedWithNoLogsToRender && (
                  <p className="text-base-500 mt-3">No Logs Available</p>
                )}
              </div>
              <div className="text-brand-600 bg-base-50 rounded-b-md px-6 py-3 text-sm ">
                <p className="w-fit">
                  <Link to="/logs">
                    <span className="flex items-center ">
                      View all logs
                      <MdArrowForward className="ml-1 h-4 w-4 cursor-pointer" />
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <QuickLinks />
          <UsageSummaryDetails />
          <LogDetails />
        </>
      )}
    </div>
  );
};
export default Overview;
