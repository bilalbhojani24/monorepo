import { useState } from 'react';
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

  const getDefaultAutoGenerateName = () =>
    `${selectedApp?.name}-v${selectedApp?.version}-${
      selectedDevice?.manufacturer
    }-${selectedDevice?.model}-${new Date().toISOString()}`;

  const [sessionName, setSessionName] = useState(getDefaultAutoGenerateName());

  const sessionNameChanged = (event) => {
    const newValue = event.target.value;
    setSessionName(newValue);
  };

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const navigateToStep = (stepNumber) => {
    dispatch(setCurrentSetupStep(stepNumber));
  };

  const startTestSession = () => {
    dispatch(triggerSession(navigateToPath, sessionName));
  };

  return {
    selectedDevice,
    selectedApp,
    navigateToStep,
    startTestSession,
    sessionName,
    sessionNameChanged
  };
};

export default useConfirmStartTesting;
