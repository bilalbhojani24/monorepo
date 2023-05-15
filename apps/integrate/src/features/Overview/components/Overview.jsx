import React from 'react';

import RequestsChart from '../../RequestsChart';

import OverviewHeader from './OverviewHeader';

const Overview = () => (
  <div className="h-full">
    <OverviewHeader />
    <div className="flex h-full flex-col px-8 lg:flex-row">
      <RequestsChart />
    </div>
  </div>
);
export default Overview;
