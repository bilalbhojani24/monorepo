import React from 'react';
import { Button, MdChevronLeft, MdFolderOpen } from '@browserstack/bifrost';

import useReportHeader from './useReportHeader';

const ReportHeader = () => {
  const { sessionData, backButtonClicked, openDiagnosticFolder } =
    useReportHeader();

  return (
    <div
      id="reportHeader"
      className="border-base-300 fixed top-0 z-10 flex w-full
       items-center justify-between border-b bg-white 
       px-4 py-2 shadow"
    >
      <div className="text-base-500 flex items-center">
        <div className="text-xl">
          <MdChevronLeft onClick={backButtonClicked} />
        </div>

        <div className="mx-2 text-sm font-medium leading-5">
          {sessionData.name}
        </div>
      </div>

      <div className="text-base-700">
        <Button
          size="large"
          colors="white"
          variant="primary"
          icon={<MdFolderOpen />}
          onClick={openDiagnosticFolder}
        >
          View Diagnostic Logs
        </Button>
      </div>
    </div>
  );
};
export default ReportHeader;
