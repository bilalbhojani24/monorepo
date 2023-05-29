import React from 'react';
import O11yLoader from 'common/O11yLoader';

function BuildReportProcessing() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <div className="flex-col text-center">
        <O11yLoader loaderClass="w-9 h-9 text-5xl" />
        <p className="text-base-600 mt-5 text-sm font-medium">
          We are processing the report.
        </p>
        <p className="text-base-600 text-sm font-medium">
          It may take a while...
        </p>
      </div>
    </div>
  );
}

export default React.memo(BuildReportProcessing);
