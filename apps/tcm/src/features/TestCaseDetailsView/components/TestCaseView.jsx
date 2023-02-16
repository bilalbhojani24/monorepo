import React from 'react';
import Loader from 'common/Loader';

// import { TMButton } from 'common/bifrostProxy';
import TestCaseBasicData from './TestCaseBasicData';
import TestCaseMutliData from './TestCaseMutliData';
import TestCaseTopBar from './TestCaseTopBar';
import useTestCaseView from './useTestCaseView';

const TestCaseView = () => {
  const { testCaseDetails, testCaseId } = useTestCaseView();

  if (
    !testCaseDetails ||
    parseInt(testCaseId, 10) !== parseInt(testCaseDetails?.id, 10)
  )
    return (
      <div className="flex h-full flex-col items-stretch px-6 pt-5">
        <Loader />
      </div>
    );

  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex h-full flex-col items-stretch px-6 pt-5">
        <div className="pb-4">
          <TestCaseTopBar />
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
    </div>
  );
};

export default TestCaseView;
