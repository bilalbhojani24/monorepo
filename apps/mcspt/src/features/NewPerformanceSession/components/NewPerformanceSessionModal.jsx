import React from 'react';
import { Modal } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import ConfirmStartTesting from './ConfirmStartTesting';
import SelectApplicationStep from './SelectApplicationStep';
import SelectDeviceStep from './SelectDeviceStep';
import SetupProgressBar from './SetupProgressBar';
import useNewPerformanceSessionModal from './useNewPerformanceSessionModal';

const renderCurrentStep = (step, setShowNewSessionModal) => {
  switch (step) {
    case 1: {
      return (
        <SelectDeviceStep setShowNewSessionModal={setShowNewSessionModal} />
      );
    }

    case 2: {
      return (
        <SelectApplicationStep
          setShowNewSessionModal={setShowNewSessionModal}
        />
      );
    }

    case 3: {
      return (
        <ConfirmStartTesting setShowNewSessionModal={setShowNewSessionModal} />
      );
    }

    default: {
      return null;
    }
  }
};

const NewPerformanceSessionModal = ({
  showNewSessionModal,
  setShowNewSessionModal
}) => {
  const { currentSetupStep, stepsDetails } = useNewPerformanceSessionModal();

  return (
    <Modal show={showNewSessionModal} size="3xl">
      <div className="flex min-h-[35rem]">
        <div className="border-base-300 w-[212px] border-r">
          <SetupProgressBar
            currentStep={currentSetupStep}
            stepsDetails={stepsDetails}
          />
        </div>

        {renderCurrentStep(currentSetupStep, setShowNewSessionModal)}
      </div>
    </Modal>
  );
};

NewPerformanceSessionModal.propTypes = {
  showNewSessionModal: PropTypes.bool,
  setShowNewSessionModal: PropTypes.func
};

NewPerformanceSessionModal.defaultProps = {
  showNewSessionModal: false,
  setShowNewSessionModal: () => {}
};

export default NewPerformanceSessionModal;
