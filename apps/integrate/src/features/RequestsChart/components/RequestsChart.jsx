import React from 'react';

import SelectDateRange from '../../../common/SelectDateRange';

import Chart from './Chart';

const RequestsChart = () => (
  // eslint-disable-next-line tailwindcss/no-arbitrary-value
  <div className="mb-6 h-[440px] flex-1 rounded-lg bg-white p-6 drop-shadow">
    <div className="mb-5 flex justify-between">
      <p className="text-lg font-semibold">API Requests</p>
      <SelectDateRange />
    </div>
    <p className="text-base-900 text-3xl font-semibold">450</p>
    <Chart />
  </div>
);

export default RequestsChart;
