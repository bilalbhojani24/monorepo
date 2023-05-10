import React from 'react';
import PropTypes from 'prop-types';

import ReportContent from '../../ReportContent';
import ReportHeader from '../../ReportHeader';
import ReportSidebar from '../../ReportSidebar';
import { ReportContext } from '../ReportContext';

import useReport from './useReport';

const Report = ({ handleUrlViaConsumer, handleFolderViaConsumer }) => {
  useReport();

  return (
    <ReportContext.Provider
      value={{ handleUrlViaConsumer, handleFolderViaConsumer }}
    >
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
    </ReportContext.Provider>
  );
};

Report.propTypes = {
  handleUrlViaConsumer: PropTypes.func,
  handleFolderViaConsumer: PropTypes.func
};

Report.defaultProps = {
  handleUrlViaConsumer: () => {},
  handleFolderViaConsumer: () => {}
};

export default Report;
