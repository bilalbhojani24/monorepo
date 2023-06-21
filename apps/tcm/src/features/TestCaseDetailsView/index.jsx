import React, { useEffect } from 'react';
import { TMSlideover, TMSlideoverHeader } from 'common/bifrostProxy';
import { setShowFreshChatButton } from 'globalSlice';
import PropTypes from 'prop-types';

import TestCaseView from './components/TestCaseView';
import useTestCaseView from './components/useTestCaseView';

const TestCaseDetailsView = ({
  projectId,
  folderId,
  testCaseId,
  onDetailsClose,
  isFromTestRun,
  onResultClick,
  testResultsArray,
  resultUpdatable,
  testRunId,
  testRunName
}) => {
  const {
    dispatch,
    isSearchFilterView,
    initTestCaseDetails,
    hideTestCaseViewDrawer,
    actionHandler,
    isTestCaseViewVisible
  } = useTestCaseView({
    projectId,
    folderId,
    testRunId,
    testCaseId,
    isFromTestRun,
    onDetailsClose,
    testResultsArray
  });

  useEffect(() => {
    if (testCaseId) initTestCaseDetails();
    else hideTestCaseViewDrawer();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testCaseId]);

  useEffect(
    () => () => {
      hideTestCaseViewDrawer(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (isTestCaseViewVisible && testCaseId) {
      dispatch(setShowFreshChatButton(false));
    }
    return () => {
      if (isTestCaseViewVisible && testCaseId && isFromTestRun) {
        setTimeout(() => {
          dispatch(setShowFreshChatButton(true));
        }, 400);
      }
    };
  }, [
    dispatch,
    isTestCaseViewVisible,
    testCaseId,
    isFromTestRun,
    isSearchFilterView
  ]);

  return (
    <TMSlideover
      onEscPress={hideTestCaseViewDrawer}
      // key={testCaseId}
      show={!!(isTestCaseViewVisible && testCaseId)}
      onClose={hideTestCaseViewDrawer}
      onOverlayClick={hideTestCaseViewDrawer}
      closeButtonOutside={false}
      description=""
      backgroundOverlay={false}
      size="md"
    >
      <TMSlideoverHeader
        isEllipsisHeader={false}
        headingWrapperClassName="text-sm text-base-700 flex justify-center items-center"
        heading="TEST CASE DETAILS"
        isBorder
        wrapperClassName="bg-white"
        handleDismissClick={() => hideTestCaseViewDrawer(null, true)}
      />
      <TestCaseView
        actionHandler={actionHandler}
        isFromTestRun={isFromTestRun}
        resultUpdatable={resultUpdatable}
        onResultClick={onResultClick}
        testRunId={testRunId}
        testRunName={testRunName}
      />
    </TMSlideover>
  );
};

TestCaseDetailsView.propTypes = {
  projectId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  folderId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  testCaseId: PropTypes.oneOfType(PropTypes.string, PropTypes.number),
  onDetailsClose: PropTypes.func,
  isFromTestRun: PropTypes.bool,
  resultUpdatable: PropTypes.bool,
  testRunId: PropTypes.number,
  onResultClick: PropTypes.func,
  testResultsArray: PropTypes.arrayOf(PropTypes.object),
  testRunName: PropTypes.string
};

TestCaseDetailsView.defaultProps = {
  projectId: null,
  folderId: null,
  testRunId: null,
  testCaseId: null,
  onDetailsClose: () => {},
  isFromTestRun: false,
  resultUpdatable: false,
  onResultClick: () => {},
  testResultsArray: [],
  testRunName: ''
};

export default TestCaseDetailsView;
