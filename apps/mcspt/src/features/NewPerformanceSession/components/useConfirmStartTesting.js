import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getSelectedApplication,
  getSelectedDevice,
  setCurrentSetupStep
} from '../slices/newPerformanceSessionSlice';
import { triggerSession } from '../slices/newPerformanceSessionThunks';

const useConfirmStartTesting = () => {
  const selectedDevice = useSelector(getSelectedDevice);
  const selectedApp = useSelector(getSelectedApplication);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const navigateToStep = (stepNumber) => {
    dispatch(setCurrentSetupStep(stepNumber));
  };

  const startTestSession = () => {
    dispatch(triggerSession(navigateToPath));
  };

  return { selectedDevice, selectedApp, navigateToStep, startTestSession };
};

export default useConfirmStartTesting;
