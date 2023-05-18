import React from 'react';
import {
  Button,
  MdOutlineAnalytics,
  MdOutlineFileDownload
} from '@browserstack/bifrost';

import useReportHeader from './useWebReportHeader';
import WebShareReportButton from './WebShareReportButton';

const ReportHeader = () => {
  const { sessionData } = useReportHeader();

  return (
    <div
      id="reportHeader"
      className="border-base-300 z-10 flex w-full
       items-center justify-between border-b bg-white 
       px-4 py-2 shadow"
    >
      <div className="flex items-center">
        <div className="text-base-600 cursor-pointer  text-xl">
          <MdOutlineAnalytics />
        </div>

        <div className="text-base-900 mx-2  text-sm font-medium leading-5">
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
