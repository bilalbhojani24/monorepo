import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdArrowForward } from '@browserstack/bifrost';

import { getConfigurationsThunk } from '../../../api';
import { closeUsageSummarySlideover, logsSelector } from '../../../globalSlice';
import { LogDetails, LogsTable } from '../../LogsPage';
import RequestsChart from '../../RequestsChart';
import UsageSummary from '../../UsageSummary';
import UsageSummaryDetails from '../../UsageSummary/components/UsageSummaryDetails';

import OverviewHeader from './OverviewHeader';
import QuickLinks from './QuickLinks';

const Overview = () => {
  const dispatch = useDispatch();
  const logsData = useSelector(logsSelector);
  useEffect(() => {
    dispatch(getConfigurationsThunk());
    return () => {
      dispatch(closeUsageSummarySlideover());
    };
  }, [dispatch]);
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
          <LogsTable logsData={logsData} />
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
