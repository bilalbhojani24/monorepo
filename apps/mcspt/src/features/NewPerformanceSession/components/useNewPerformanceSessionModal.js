import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  getCurrentSetupStep,
  getSelectedApplication,
  getSelectedDevice,
  resetSessionSetupData
} from '../slices/newPerformanceSessionSlice';

const useNewPerformanceSessionModal = (setShowNewSessionModal) => {
  const currentSetupStep = useSelector(getCurrentSetupStep);
  const selectedApplication = useSelector(getSelectedApplication);
  const selectedDevice = useSelector(getSelectedDevice);

  const [stepsDetails, setStepsDetails] = useState([]);

  const dispatch = useDispatch();

  const sessionSetupClosed = () => {
    setShowNewSessionModal(false);
    dispatch(resetSessionSetupData());
  };

  useEffect(() => {
    setStepsDetails([
      {
        stepNumber: 1,
        stepTitle: 'Select device',
        stepDesc: selectedDevice?.deviceId
          ? `${selectedDevice?.manufacturer} ${selectedDevice?.model} ∙ ${selectedDevice?.os} ${selectedDevice?.osVersion}`
          : 'Select a device to test on'
      },
      {
        stepNumber: 2,
        stepTitle: 'Select Application',
        stepDesc: selectedApplication?.packageName
          ? `${selectedApplication?.name} - v${selectedApplication?.version}`
          : 'Select an application to test'
      },
      {
        stepNumber: 3,
        stepTitle: 'Start Testing',
        stepDesc: 'Confirm details & start testing'
      }
    ]);
  }, [selectedDevice, selectedApplication]);

  return { currentSetupStep, stepsDetails, sessionSetupClosed };
};

export default useNewPerformanceSessionModal;
