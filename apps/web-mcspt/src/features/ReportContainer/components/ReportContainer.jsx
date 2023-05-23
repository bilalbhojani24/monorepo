import React from 'react';
import { Report } from '@browserstack/mcp-shared';

import WebReportHeader from '../../WebReportHeader';

import ReportError from './ReportError';
import ReportLoading from './ReportLoading';
import useReportContainer from './useReportContainer';

const ReportContainer = () => {
  const { isReportLoading, isReportErrored, openUrlInNewTab } =
    useReportContainer();

  return (
    <>
      {isReportLoading && <ReportLoading />}

      {isReportErrored && <ReportError />}

      {!isReportLoading && !isReportErrored && (
        <div className="flex max-h-[calc(100vh-4rem)]">
          <Report
            handleUrlViaConsumer={openUrlInNewTab}
            handleFolderViaConsumer={openUrlInNewTab}
            headerComponent={<WebReportHeader />}
          />
        </div>
      )}
    </>
  );
};

export default ReportContainer;
