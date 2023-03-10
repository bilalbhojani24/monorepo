import React from 'react';

import ReportContent from 'features/ReportContent';
import ReportHeader from 'features/ReportHeader';
import ReportSidebar from 'features/ReportSidebar';

const Report = () => (
  <div id="reportContainer" className="flex min-h-screen flex-col">
    <ReportHeader />

    <div className="flex max-w-full flex-1">
      <div className="flex w-64 shrink-0 grow-0 flex-col items-center lg:w-64 xl:w-[360px]">
        <ReportSidebar />
      </div>

      <div id="reportContentContainer" className="mb-4 flex-1">
        <ReportContent />
      </div>
    </div>

    <div id="footerContainer" />
  </div>
);

export default Report;
