import React, { useEffect } from 'react';
import { TMSlideover, TMSlideoverHeader } from 'common/bifrostProxy';

import TestCaseView from './components/TestCaseView';
import useTestCaseView from './components/useTestCaseView';

const TestCaseDetailsView = () => {
  const {
    testCaseId,
    fetchTestCaseDetails,
    hideTestCaseViewDrawer,
    isTestCaseViewVisible
  } = useTestCaseView();

  useEffect(() => {
    if (testCaseId) fetchTestCaseDetails();
    else hideTestCaseViewDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseId]);

  return (
    <TMSlideover
      key={testCaseId}
      show={isTestCaseViewVisible}
      onClose={hideTestCaseViewDrawer}
      onOverlayClick={hideTestCaseViewDrawer}
      closeButtonOutside={false}
      description=""
      topMarginElementId="bstack-header"
      slideoverWidth="max-w-md w-screen"
      backgroundOverlay={false}
    >
      <TMSlideoverHeader
        heading="Test Case Details"
        isBorder
        backgroundColorClass="bg-white"
        handleDismissClick={hideTestCaseViewDrawer}
      />
      <TestCaseView />
    </TMSlideover>
  );
};

export default TestCaseDetailsView;
