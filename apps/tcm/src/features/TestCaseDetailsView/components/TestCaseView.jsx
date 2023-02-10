import React from 'react';
import Loader from 'common/Loader';

// import { TMButton } from 'common/bifrostProxy';
import TestCaseBasicData from './TestCaseBasicData';
import TestCaseMutliData from './TestCaseMutliData';
import TestCaseTopBar from './TestCaseTopBar';
import useTestCaseView from './useTestCaseView';

const TestCaseView = () => {
  const { testCaseDetails, testCaseId } = useTestCaseView();

  if (!testCaseDetails || testCaseId !== `${testCaseDetails?.id}`)
    return (
      <div className="flex h-full flex-col items-stretch px-6 pt-5">
        <Loader />
      </div>
    );

  return (
    <div class="overflow-scroll flex-1">
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
