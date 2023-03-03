import React from 'react';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

// import { TMButton } from 'common/bifrostProxy';
import TestCaseBasicData from './TestCaseBasicData';
import TestCaseMutliData from './TestCaseMutliData';
import TestCaseTopBar from './TestCaseTopBar';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseView = ({
  actionHandler,
  isFromTestRun,
  resultUpdatable,
  onResultClick,
  testRunId
}) => {
  const { testCaseDetails, testCaseId } = useTestCaseViewDetails();

  if (
    !testCaseDetails ||
    parseInt(testCaseId, 10) !== parseInt(testCaseDetails?.id, 10)
  )
    return (
      <div className="align-center flex h-full flex-col items-stretch justify-center px-6 pt-5">
        <Loader />
      </div>
    );

  return (
    <div className="flex-1 overflow-scroll">
      <div className="flex h-full flex-col items-stretch px-6 pt-5">
        <div className="pb-4">
          <TestCaseTopBar
            actionHandler={actionHandler}
            isFromTestRun={isFromTestRun}
          />
          <TestCaseBasicData />
          <TestCaseMutliData
            isFromTestRun={isFromTestRun}
            onResultClick={onResultClick}
            resultUpdatable={resultUpdatable}
            testRunId={testRunId}
          />
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

TestCaseView.propTypes = {
  actionHandler: PropTypes.func,
  testRunId: PropTypes.number,
  isFromTestRun: PropTypes.bool,
  resultUpdatable: PropTypes.bool,
  onResultClick: PropTypes.bool
};

TestCaseView.defaultProps = {
  actionHandler: () => {},
  testRunId: null,
  isFromTestRun: false,
  resultUpdatable: false,
  onResultClick: () => {}
};

export default TestCaseView;
