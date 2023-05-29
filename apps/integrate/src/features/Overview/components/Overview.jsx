import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowForward } from '@browserstack/bifrost';

import { getConfigurationsThunk, getLogsThunk } from '../../../api';
import { LOADING_STATUS } from '../../../constants/loadingConstants';
import {
  activeConfigurationsSelector,
  closeUsageSummarySlideover,
  logsLoadingSelector,
  logsSelector
} from '../../../globalSlice';
import { getCleanedConfigurationIds } from '../../../utils/helpers';
import { LogDetails, LogsTable } from '../../LogsPage';
import RequestsChart from '../../RequestsChart';
import UsageSummary from '../../UsageSummary';
import UsageSummaryDetails from '../../UsageSummary/components/UsageSummaryDetails';
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
      configurations: cleanedActiveConfigurationId,
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
  return (
    <div className="h-full">
      <OverviewHeader />
      <div className="flex flex-col px-8 lg:flex-row">
        <RequestsChart />
        <UsageSummary />
      </div>
      <div className="m-8 rounded-md bg-white drop-shadow">
        <div className="p-6">
          <p className="mb-3 text-lg font-semibold text-black">Recent Logs</p>
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
      <QuickLinks />
      <UsageSummaryDetails />
      <LogDetails />
    </div>
  );
};
export default Overview;
