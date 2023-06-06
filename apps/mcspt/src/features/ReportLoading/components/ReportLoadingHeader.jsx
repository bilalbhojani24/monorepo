import React from 'react';
import {
  Button,
  MdChevronLeft,
  MdOutlineAnalytics
} from '@browserstack/bifrost';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import PropTypes from 'prop-types';

import useReportLoadingHeader from './useReportLoadingHeader';

const ReportLoadingHeader = ({
  setShowQuitTestingPrompt,
  setShowGenerateReportPrompt
}) => {
  const { sessionState, sessionDetails, isSessionStopInProgress } =
    useReportLoadingHeader();

  return (
    <div className="flex items-center justify-between border-b border-base-300 p-4 text-base-500">
      <div className="flex items-center">
        <div className="cursor-pointer text-xl">
          <MdChevronLeft
            onClick={() => {
              if (sessionState === REPORT_LOADING_STATES.RECORDING) {
                setShowQuitTestingPrompt(true);
              }
            }}
          />
        </div>

        <div className="mx-2 text-sm font-medium leading-5">
          {sessionDetails.sessionName}
        </div>
      </div>

      {sessionState !== REPORT_LOADING_STATES.STOPPING &&
        sessionState !== REPORT_LOADING_STATES.COMPLETE && (
          <Button
            loading={isSessionStopInProgress}
            icon={<MdOutlineAnalytics />}
            variant="primary"
            colors="brand"
            size="default"
            onClick={() => {
              setShowGenerateReportPrompt(true);
            }}
            disabled={sessionState !== REPORT_LOADING_STATES.RECORDING}
          >
            Generate Performance Report
          </Button>
        )}
    </div>
  );
};

ReportLoadingHeader.propTypes = {
  setShowQuitTestingPrompt: PropTypes.func,
  setShowGenerateReportPrompt: PropTypes.func
};

ReportLoadingHeader.defaultProps = {
  setShowQuitTestingPrompt: () => {},
  setShowGenerateReportPrompt: () => {}
};

export default ReportLoadingHeader;
