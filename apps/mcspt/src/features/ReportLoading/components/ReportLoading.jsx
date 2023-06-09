import React from 'react';

import GenerateReportPrompt from './GenerateReportPrompt';
import QuitTestingPrompt from './QuitTestingPrompt';
import ReportLoadingContent from './ReportLoadingContent';
import ReportLoadingHeader from './ReportLoadingHeader';
import ReportLoadingSidebar from './ReportLoadingSidebar';
import useReportLoading from './useReportLoading';

const ReportLoading = () => {
  const {
    quitTestConfirmed,
    stopSessionClicked,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    showQuitTestingPrompt,
    setShowQuitTestingPrompt
  } = useReportLoading();

  return (
    <div className="flex w-full flex-col">
      <ReportLoadingHeader
        setShowQuitTestingPrompt={setShowQuitTestingPrompt}
      />

      <div className="bg-base-50 flex flex-1">
        <ReportLoadingSidebar />

        <ReportLoadingContent
          setShowGenerateReportPrompt={setShowGenerateReportPrompt}
        />
      </div>

      <GenerateReportPrompt
        showGenerateReportPrompt={showGenerateReportPrompt}
        setShowGenerateReportPrompt={setShowGenerateReportPrompt}
        stopSessionClicked={stopSessionClicked}
      />

      <QuitTestingPrompt
        showQuitTestingPrompt={showQuitTestingPrompt}
        setShowQuitTestingPrompt={setShowQuitTestingPrompt}
        quitTestConfirmed={quitTestConfirmed}
      />
    </div>
  );
};

export default ReportLoading;
