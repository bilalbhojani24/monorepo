import React from 'react';

import Filters from './Filters';

const LogsHeader = () => (
  <div className="bg-base-50 p-6">
    <p className="text-base-900 mb-2 text-2xl font-bold">Logs</p>
    <div className="flex justify-between">
      <p className="text-base-500">
        Search, monitor, and track all the API calls.
      </p>
    </div>
    <Filters />
  </div>
);

export default LogsHeader;
