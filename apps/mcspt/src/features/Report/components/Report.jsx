import React from 'react';
import ReportContent from 'features/ReportContent';
import ReportHeader from 'features/ReportHeader';
import ReportSidebar from 'features/ReportSidebar';

const Report = () => (
  <div id="reportContainer" className="flex w-full flex-col">
    <ReportHeader />

    <div className="mb-16 mt-14 flex max-w-full flex-1 overflow-hidden pt-1">
      <div className="flex w-64 shrink-0 grow-0 flex-col items-center lg:w-64 xl:w-[360px]">
        <ReportSidebar />
      </div>

      <div id="reportContentContainer" className="flex-1 overflow-y-scroll">
        <ReportContent />
      </div>
    </div>
  </div>
);

export default Report;
