import React from 'react';
import { Button, MdOutlineAnalytics, Modal } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useGenerateReportPrompt from './useGenerateReportPrompt';

const GenerateReportPrompt = ({
  showGenerateReportPrompt,
  setShowGenerateReportPrompt,
  stopSessionClicked
}) => {
  const { isSessionStopInProgress } = useGenerateReportPrompt();

  return (
    <Modal wrapperClassName="" show={showGenerateReportPrompt} size="sm">
      <div className="flex flex-col p-6">
        <div className="flex flex-col items-center justify-center ">
          <div
            className="bg-info-50 text-info-600 flex min-h-[48px] min-w-[48px] 
                items-center justify-center rounded-full text-2xl"
          >
            <MdOutlineAnalytics />
          </div>

          <div className="mb-2 mt-5 text-lg font-medium leading-6">
            Generate Performance Report
          </div>
          <div className="text-base-500 text-sm font-normal leading-5">
            Current test session will be stopped
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => {
              setShowGenerateReportPrompt(false);
            }}
            variant="primary"
            colors="white"
            size="default"
          >
            Continue Testing
          </Button>

          <Button
            onClick={stopSessionClicked}
            variant="primary"
            colors="brand"
            size="default"
            loading={isSessionStopInProgress}
          >
            Generate Report
          </Button>
        </div>
      </div>
    </Modal>
  );
};

GenerateReportPrompt.propTypes = {
  showGenerateReportPrompt: PropTypes.bool,
  setShowGenerateReportPrompt: PropTypes.func,
  stopSessionClicked: PropTypes.func
};

GenerateReportPrompt.defaultProps = {
  showGenerateReportPrompt: false,
  setShowGenerateReportPrompt: () => {},
  stopSessionClicked: () => {}
};

export default GenerateReportPrompt;
