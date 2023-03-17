import React from 'react';
import {
  Button,
  MdChevronLeft,
  MdEdit,
  MdFolderOpen
} from '@browserstack/bifrost';

import useReportHeader from './useReportHeader';

const ReportHeader = () => {
  const { sessionData, backButtonClicked, openDiagnosticFolder } =
    useReportHeader();

  return (
    <div className="border-base-300 flex items-center justify-between border-b py-2 px-4 shadow">
      <div className="text-base-500 flex items-center">
        <div className="text-xl">
          <MdChevronLeft onClick={backButtonClicked} />
        </div>

        <div className="mx-2 text-sm font-medium leading-5">
          {sessionData.name}
        </div>

        <div className="text-xl">
          <MdEdit />
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
