import React from 'react';

// import { TMButton } from 'bifrostProxy';
import TestCaseBasicData from './TestCaseBasicData';
import TestCaseMutliData from './TestCaseMutliData';
import useTestCaseView from './useTestCaseView';

const TestCaseView = () => {
  const { testCaseDetails, testCaseId } = useTestCaseView();

  if (!testCaseDetails || testCaseId !== `${testCaseDetails?.id}`)
    return 'Loading..';

  return (
    <div className="flex h-full flex-col items-stretch px-6 pt-5">
      <div className="h-full w-full overflow-y-auto">
        <TestCaseBasicData />
        <TestCaseMutliData />
      </div>
      {/* <div className="flex w-full justify-between">
        <TMButton variant="minimal" colors="white">
          Previous
        </TMButton>
        <TMButton variant="minimal" colors="white">
          Next
        </TMButton>
      </div> */}
    </div>
  );
};

export default TestCaseView;
