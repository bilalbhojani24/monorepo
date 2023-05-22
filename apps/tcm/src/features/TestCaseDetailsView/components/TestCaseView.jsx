import React from 'react';
import Loader from 'common/Loader';
import PropTypes from 'prop-types';

import TestCaseBasicData from './TestCaseBasicData';
import TestCaseMutliData from './TestCaseMutliData';
import TestCaseTopBar from './TestCaseTopBar';
import useTestCaseViewDetails from './useTestCaseViewDetails';

const TestCaseView = ({
  actionHandler,
  isFromTestRun,
  resultUpdatable,
  onResultClick,
  testRunId,
  testResultsArray,
  testRunName
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
    <div className="flex-1 overflow-scroll" key={testCaseId}>
      <div className="flex h-full flex-col items-stretch px-6 pt-5">
        <div className="pb-4">
          <TestCaseTopBar
            actionHandler={actionHandler}
            isFromTestRun={isFromTestRun}
          />
          <TestCaseBasicData isFromTestRun={isFromTestRun} />
          <TestCaseMutliData
            isFromTestRun={isFromTestRun}
            onResultClick={onResultClick}
            resultUpdatable={resultUpdatable}
            testRunId={testRunId}
            testResultsArray={
              isFromTestRun
                ? testResultsArray
                : testCaseDetails?.test_run_issues
            }
            testRunName={testRunName}
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
  testRunId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  isFromTestRun: PropTypes.bool,
  resultUpdatable: PropTypes.bool,
  onResultClick: PropTypes.func,
  testResultsArray: PropTypes.arrayOf({}),
  testRunName: PropTypes.string
};

TestCaseView.defaultProps = {
  actionHandler: () => {},
  testRunId: null,
  isFromTestRun: false,
  resultUpdatable: false,
  onResultClick: () => {},
  testResultsArray: [],
  testRunName: ''
};

export default TestCaseView;
