import React from 'react';
import { Button, MdOutlineFileDownload } from '@browserstack/bifrost';

import useReportHeader from './useWebReportHeader';
import WebShareReportButton from './WebShareReportButton';

const ReportHeader = () => {
  const { sessionData } = useReportHeader();

  return (
    <div
      id="reportHeader"
      className="border-base-300 fixed top-0 z-10 flex w-full
       items-center justify-between border-b bg-white 
       px-4 py-2 shadow"
    >
      <div className="text-base-500 flex items-center">
        <div className="mx-2 text-sm font-medium leading-5">
          {sessionData.name}
        </div>
      </div>

      <div className="text-base-700">
        <WebShareReportButton />

        <Button
          size="default"
          colors="white"
          variant="primary"
          icon={<MdOutlineFileDownload />}
          onClick={() => {}}
        >
          Download Logs
        </Button>
      </div>
    </div>
  );
};
export default ReportHeader;
