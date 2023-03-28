import React, { useEffect } from 'react';
import TestCaseDetailsView from 'features/TestCaseDetailsView';

import Folders from './Folders';
import MiniDetails from './MiniDetails';
import TestCases from './TestCases';
import TopSection from './TopSection';
import useTestRunDetails from './useTestRunDetails';
import useTRTCFolders from './useTRTCFolders';

const TestRunDetails = () => {
  const {
    projectId,
    testCaseDetails,
    testRunDetails,
    testRunId,
    fetchTestRunDetails,
    sendPageLoadingLog,
    resetTestCaseDetailsMeta,
    setTestRunDetailsLoading
  } = useTestRunDetails();

  const { onResultChange, testResultsArray } = useTRTCFolders();

  useEffect(() => {
    sendPageLoadingLog();
    fetchTestRunDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testRunId]);

  useEffect(
    () => () => {
      resetTestCaseDetailsMeta();
      setTestRunDetailsLoading();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
      <TopSection />
      <MiniDetails />
      <div className="flex flex-1 shrink-0 grow flex-col overflow-hidden">
        <div className="flex flex-1 shrink-0 grow  items-stretch justify-center  overflow-hidden bg-white">
          <main className="w-full min-w-0 shrink-0 grow overflow-hidden lg:flex">
            <TestCases />
            <Folders />
          </main>
        </div>
      </div>
      <TestCaseDetailsView
        testResultsArray={testResultsArray}
        folderId={testCaseDetails?.folderId}
        projectId={projectId}
        testCaseId={testCaseDetails?.testCaseId}
        onDetailsClose={resetTestCaseDetailsMeta}
        isFromTestRun
        testRunId={testRunId}
        resultUpdatable={testRunDetails?.run_state !== 'closed'}
        onResultClick={onResultChange}
      />
    </div>
  );
};

export default TestRunDetails;
