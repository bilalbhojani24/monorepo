import React from 'react';
import { Report } from '@browserstack/mcp-shared';

import WebReportHeader from '../../WebReportHeader';

import ReportError from './ReportError';
import ReportLoading from './ReportLoading';
import useReportContainer from './useReportContainer';

const ReportContainer = () => {
  const { isReportLoading, isReportErrored } = useReportContainer();

  return (
    <>
      {isReportLoading && <ReportLoading />}

      {isReportErrored && <ReportError />}

      {!isReportLoading && !isReportErrored && (
        <div className="flex max-h-screen">
          <Report
            handleUrlViaConsumer={() => {}}
            handleFolderViaConsumer={() => {}}
            headerComponent={<WebReportHeader />}
          />
        </div>
      )}
    </>
  );
};

export default ReportContainer;
