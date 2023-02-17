import React from 'react';

import ReportContent from '../../ReportContent';
import ReportHeader from '../../ReportHeader';

// import useReport from './useReport';

const Report = () => (
  <div id="reportContentContainer" className="flex min-h-screen flex-col">
    <ReportHeader />

    <div className="flex max-w-full flex-1">
      <div className="flex w-64 shrink-0 grow-0 flex-col items-center lg:w-[360px]">
        <div className="bg-base-100 mx-3 h-full w-full">Video</div>
      </div>
      <div id="reportContentContainer" className="flex-1">
        <ReportContent />
      </div>
    </div>

    <div id="footerContainer" />
  </div>
);
export default Report;
