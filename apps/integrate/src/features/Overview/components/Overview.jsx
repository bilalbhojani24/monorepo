import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getConfigurationsThunk } from '../../../api';
import { closeUsageSummarySlideover } from '../../../globalSlice';
import RequestsChart from '../../RequestsChart';
import UsageSummary from '../../UsageSummary';
import UsageSummaryDetails from '../../UsageSummary/components/UsageSummaryDetails';

import OverviewHeader from './OverviewHeader';
import QuickLinks from './QuickLinks';

const Overview = () => {
  const dispatch = useDispatch();
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
      <QuickLinks />
      <UsageSummaryDetails />
    </div>
  );
};
export default Overview;
