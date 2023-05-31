import React from 'react';

import SelectConfigurations from './SelectConfigurations';

const OverviewHeader = () => (
  <div className="bg-base-50 flex items-end justify-between p-6">
    <div>
      <p className="text-base-900 text-2xl font-bold">Overview</p>
      <p className="text-base-500">
        Gain insights into the integrations being used by your organization.
      </p>
    </div>
    <div className="flex justify-between">
      <SelectConfigurations />
    </div>
  </div>
);

export default OverviewHeader;
