import React from 'react';
import { Modal } from '@browserstack/bifrost';

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

export default function NewPerformanceSessionModal({
  showNewSessionModal,
  setShowNewSessionModal
}) {
  const { currentSetupStep } = useNewPerformanceSessionModal();

  return (
    <Modal show={showNewSessionModal} size="3xl">
      <div className="flex min-h-[35rem]">
        <div className="border-base-300 w-[212px] border-r">
          <SetupProgressBar currentStep={currentSetupStep} />
        </div>

        {renderCurrentStep(currentSetupStep, setShowNewSessionModal)}
      </div>
    </Modal>
  );
}
