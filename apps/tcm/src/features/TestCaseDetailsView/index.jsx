import React, { useEffect } from 'react';
import { TMDrawer } from 'bifrostProxy';

import TestCaseView from './components/TestCaseView';
import useTestCaseView from './components/useTestCaseView';

const TestCaseDetailsView = () => {
  const {
    testCaseId,
    fetchTestCaseDetails,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible,
  } = useTestCaseView();

  useEffect(() => {
    if (testCaseId) fetchTestCaseDetails();
    else hideTestCaseViewDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseId]);

  return (
    <>
      {isTestCaseViewVisible && (
        <TMDrawer
          key={testCaseId}
          onClose={hideTestCaseViewDrawer}
          title="Check Register flow as Tester"
          description=""
          bodyNode={<TestCaseView />}
        />
      )}
    </>
  );
};

export default TestCaseDetailsView;
