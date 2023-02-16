import React, { useEffect } from 'react';
import { TMSlideover, TMSlideoverHeader } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import TestCaseView from './components/TestCaseView';
import useTestCaseView from './components/useTestCaseView';

const TestCaseDetailsView = ({ projectId, folderId, testCaseId }) => {
  const { initTestCaseDetails, hideTestCaseViewDrawer, isTestCaseViewVisible } =
    useTestCaseView({ projectId, folderId, testCaseId });

  useEffect(() => {
    if (testCaseId) initTestCaseDetails();
    else hideTestCaseViewDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseId]);

  return (
    <TMSlideover
      onEscPress={hideTestCaseViewDrawer}
      key={testCaseId}
      show={isTestCaseViewVisible}
      onClose={hideTestCaseViewDrawer}
      onOverlayClick={hideTestCaseViewDrawer}
      closeButtonOutside={false}
      description=""
      backgroundOverlay={false}
      size="md"
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

TestCaseDetailsView.propTypes = {
  projectId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  folderId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  testCaseId: PropTypes.oneOfType(PropTypes.string, PropTypes.number)
};

TestCaseDetailsView.defaultProps = {
  projectId: null,
  folderId: null,
  testCaseId: null
};

export default TestCaseDetailsView;
