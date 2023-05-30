import React from 'react';
import { Loader } from '@browserstack/bifrost';

const ReportLoading = () => (
  <div className="flex flex-1 items-center justify-center">
    <div className="flex flex-col items-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full">
        <Loader wrapperClassName="h-9 w-9 text-base-300 fill-base-400" />
      </div>

      <div className="text-base-600 mt-4 text-lg font-medium leading-7">
        Loading Performance Report
      </div>
    </div>
  </div>
);

export default ReportLoading;
