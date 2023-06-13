import React from 'react';
import {
  Banner,
  Button,
  MdChevronLeft,
  MdOutlineAnalytics,
  MdOutlineTimer
} from '@browserstack/bifrost';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import PropTypes from 'prop-types';

import useReportLoadingHeader from './useReportLoadingHeader';

const ReportLoadingHeader = ({
  setShowQuitTestingPrompt,
  setShowGenerateReportPrompt
}) => {
  const {
    sessionState,
    sessionDetails,
    showTimeoutBanner,
    secondsElapsed,
    getBannerDescription,
    isStopSessionInProgress
  } = useReportLoadingHeader();

  return (
    <div className="flex flex-col">
      <div className="flex items-center border-b border-base-300 p-4 text-base-500">
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
            loading={isStopSessionInProgress}
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

      {showTimeoutBanner && (
        <Banner
          bannerIcon={
            <MdOutlineTimer aria-hidden="true" className="h-6 w-6 text-white" />
          }
          isDismissButton={false}
          description={getBannerDescription(secondsElapsed)}
          modifier="attention"
          align="centered"
        />
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
