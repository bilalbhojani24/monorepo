import React from 'react';
import { MdOpenInNew } from '@browserstack/bifrost';
import { TMButton } from 'common/bifrostProxy';
import moment from 'moment-timezone';

import useTestCaseViewDetails from './useTestCaseViewDetails';

const StackTrace = () => {
  const { testResultsArray, testCaseDetails, testObservabilityUrl } =
    useTestCaseViewDetails();

  const elapsedTime = testResultsArray?.[0].time_elapsed;
  const backTrace = testResultsArray?.[0].backtrace;

  const handleViewMoreDetails = () => {
    window.open(`${testObservabilityUrl}`);
  };

  return (
    <>
      {testCaseDetails?.is_automation && (
        <section>
          <section className="my-4 text-sm ">
            <div className="text-base-800 font-medium">Elapsed</div>
            <div className="text-base-700 font-normal">
              {moment('2015-01-01')
                .startOf('day')
                .seconds(elapsedTime)
                .format('HH:mm:ss')}
            </div>
          </section>
          <section className="mb-4">
            <div className="mb-1 text-sm font-medium">Response</div>
            <div className="border-base-200 bg-base-50 text-base-500 w-full break-words rounded-md border py-2 px-3 text-sm font-normal shadow-sm">
              {backTrace || '--'}
            </div>
          </section>
          {testObservabilityUrl && (
            <div className="mb-4">
              <TMButton
                colors="white"
                fullWidth
                icon={<MdOpenInNew className="h-4 w-4" />}
                iconPlacement="end"
                onClick={handleViewMoreDetails}
              >
                View More Details
              </TMButton>
            </div>
          )}
        </section>
      )}
    </>
  );
};
export default StackTrace;
