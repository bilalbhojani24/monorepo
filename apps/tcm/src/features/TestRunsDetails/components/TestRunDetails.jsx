import React, { useEffect } from 'react';
import TestCaseDetailsView from 'features/TestCaseDetailsView';

import Folders from './Folders';
import MiniDetails from './MiniDetails';
import TestCases from './TestCases';
import TopSection from './TopSection';
import useTestRunDetails from './useTestRunDetails';

const TestRunDetails = () => {
  const {
    projectId,
    testCaseDetails,
    testRunId,
    fetchTestRunDetails,
    resetTestCaseDetailsMeta
  } = useTestRunDetails();

  useEffect(() => {
    fetchTestRunDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId, testRunId]);

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
        folderId={testCaseDetails?.folderId}
        projectId={projectId}
        testCaseId={testCaseDetails?.testCaseId}
        onDetailsClose={resetTestCaseDetailsMeta}
      />
    </div>
  );
};

export default TestRunDetails;
