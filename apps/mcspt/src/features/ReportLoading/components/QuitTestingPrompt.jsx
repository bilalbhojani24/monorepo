import React from 'react';
import { Button, MdWarning, Modal } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useQuitTestingPrompt from './useQuitTestingPrompt';

const QuitTestingPrompt = ({
  showQuitTestingPrompt,
  setShowQuitTestingPrompt,
  quitTestConfirmed
}) => {
  const { isSessionStopInProgress } = useQuitTestingPrompt();

  return (
    <Modal wrapperClassName="" show={showQuitTestingPrompt} size="sm">
      <div className="flex flex-col p-6">
        <div className="flex flex-col items-center justify-center ">
          <div
            className="bg-danger-50 text-danger-600 flex min-h-[48px] min-w-[48px] 
                items-center justify-center rounded-full text-2xl"
          >
            <MdWarning />
          </div>

          <div className="mb-2 mt-5 text-lg font-medium leading-6">
            Quit Testing?
          </div>
          <div className="text-base-500 text-sm font-normal leading-5">
            The current test session will be stopped and the performance report
            won&apos;t be generated.
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <Button
            onClick={() => {
              setShowQuitTestingPrompt(false);
            }}
            variant="primary"
            colors="white"
            size="default"
          >
            Continue Testing
          </Button>

          <Button
            onClick={quitTestConfirmed}
            variant="primary"
            colors="danger"
            size="default"
            loading={isSessionStopInProgress}
          >
            Quit Testing?
          </Button>
        </div>
      </div>
    </Modal>
  );
};

QuitTestingPrompt.propTypes = {
  showQuitTestingPrompt: PropTypes.bool,
  setShowQuitTestingPrompt: PropTypes.func,
  quitTestConfirmed: PropTypes.func
};

QuitTestingPrompt.defaultProps = {
  showQuitTestingPrompt: false,
  setShowQuitTestingPrompt: () => {},
  quitTestConfirmed: () => {}
};

export default QuitTestingPrompt;
