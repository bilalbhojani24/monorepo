import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getSelectedApplication,
  getSelectedDevice,
  setCurrentSetupStep
} from '../slices/newPerformanceSessionSlice';

export default function useConfirmStartTesting() {
  const selectedDevice = useSelector(getSelectedDevice);
  const selectedApp = useSelector(getSelectedApplication);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const navigateToStep = (x) => {
    dispatch(setCurrentSetupStep(x));
  };

  const startTestSession = () => {
    navigateToPath('/generate');
  };

  return { selectedDevice, selectedApp, navigateToStep, startTestSession };
}
