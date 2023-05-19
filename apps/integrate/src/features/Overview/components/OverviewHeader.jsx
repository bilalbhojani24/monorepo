import React from 'react';
import { twClassNames } from '@browserstack/utils';

import SelectConfigurations from './SelectConfigurations';

const OverviewHeader = () => (
  <div className={twClassNames('bg-base-50 mb-4 p-8')}>
    <p className="text-base-900 text-2xl font-bold">Overview</p>
    <div className="flex justify-between">
      <p className="text-base-500">
        Medium length page description giving brief outline of contents to be
        added here
      </p>
      <SelectConfigurations />
    </div>
  </div>
);

export default OverviewHeader;
