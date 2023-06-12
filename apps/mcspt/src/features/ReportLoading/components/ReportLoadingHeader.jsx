import React from 'react';
import { Banner, MdChevronLeft, MdOutlineTimer } from '@browserstack/bifrost';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import PropTypes from 'prop-types';

import useReportLoadingHeader from './useReportLoadingHeader';

const ReportLoadingHeader = ({ setShowQuitTestingPrompt }) => {
  const {
    sessionState,
    sessionDetails,
    showTimeoutBanner,
    secondsElapsed,
    getBannerDescription
  } = useReportLoadingHeader();

  return (
    <div className="flex flex-col">
      <div className="border-base-300 text-base-500 flex items-center border-b p-4">
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
  setShowQuitTestingPrompt: PropTypes.func
};

ReportLoadingHeader.defaultProps = {
  setShowQuitTestingPrompt: () => {}
};

export default ReportLoadingHeader;
