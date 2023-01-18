import React, { useEffect } from 'react';
import { TMSlideover, TMSlideoverHeader } from 'bifrostProxy';

import TestCaseView from './components/TestCaseView';
import useTestCaseView from './components/useTestCaseView';

const TestCaseDetailsView = () => {
  const {
    testCaseDetails,
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
        <TMSlideover
          key={testCaseId}
          show
          onClose={hideTestCaseViewDrawer}
          onOverlayClick={hideTestCaseViewDrawer}
          closeButtonOutside={false}
          description=""
          topMarginElementId="whole-header"
          slideoverWidth="w-[488px]"
        >
          <TMSlideoverHeader
            heading={testCaseDetails?.name || ''}
            isBorder
            handleDismissClick={hideTestCaseViewDrawer}
          />
          <TestCaseView />
        </TMSlideover>
      )}
    </>
  );
};

export default TestCaseDetailsView;
