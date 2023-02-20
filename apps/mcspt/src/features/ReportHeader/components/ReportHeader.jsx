import React from 'react';
import {
  Button,
  MdArrowBack,
  MdFolderOpen,
  MdInfoOutline,
  MdOutlineCalendarToday
} from '@browserstack/bifrost';

import { formatReportTime } from '../../../utils/dateUtils';

import useReportHeader from './useReportHeader';

const ReportHeader = () => {
  const { sessionData, backButtonClicked, openDiagnosticFolder } =
    useReportHeader();

  return (
    <div className="flex items-center justify-between p-4 shadow">
      <div className="flex items-center">
        <div className="text-base-500">
          <MdArrowBack onClick={backButtonClicked} />
        </div>

        <div className="ml-5 flex flex-col">
          <div className="flex items-center">
            <div className="mb-1 text-xl font-bold leading-7">
              {sessionData.name}
            </div>

            <div className="text-base-500 ml-2.5 text-xl">
              <MdInfoOutline />
            </div>
          </div>

          <div className="text-base-500 flex items-center">
            <div className="mr-2.5 text-xl">
              <MdOutlineCalendarToday />
            </div>

            <div className="text-sm font-medium leading-5">
              {formatReportTime(sessionData.startTime)}
            </div>
          </div>
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
          Diagnostics
        </Button>
      </div>
    </div>
  );
};
export default ReportHeader;
