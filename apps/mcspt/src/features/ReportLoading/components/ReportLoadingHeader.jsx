import React from 'react';
import { MdChevronLeft } from '@browserstack/bifrost';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import PropTypes from 'prop-types';

import useReportLoadingHeader from './useReportLoadingHeader';

const ReportLoadingHeader = ({ setShowQuitTestingPrompt }) => {
  const { sessionState, sessionDetails } = useReportLoadingHeader();

  return (
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
  );
};

ReportLoadingHeader.propTypes = {
  setShowQuitTestingPrompt: PropTypes.func
};

ReportLoadingHeader.defaultProps = {
  setShowQuitTestingPrompt: () => {}
};

export default ReportLoadingHeader;
