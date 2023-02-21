import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getIsSessionApiLoading } from '../slices/loadingStateForNewPerformanceSession';
import {
  getSelectedApplication,
  getSelectedDevice,
  setCurrentSetupStep
} from '../slices/newPerformanceSessionSlice';
import { triggerSession } from '../slices/newPerformanceSessionThunks';

const getDefaultAutoGenerateName = (selectedDevice, selectedApp) =>
  `${selectedApp?.name}-v${selectedApp?.version}-${
    selectedDevice?.manufacturer
  }-${selectedDevice?.model}-${new Date().toISOString()}`;

const useConfirmStartTesting = () => {
  const selectedDevice = useSelector(getSelectedDevice);
  const selectedApp = useSelector(getSelectedApplication);
  const isSessionApiLoading = useSelector(getIsSessionApiLoading);

  const [sessionName, setSessionName] = useState('');
  const [sessionNameError, setSessionNameError] = useState('');

  const sessionNameChanged = (event) => {
    const newValue = event.target.value;

    setSessionName(newValue);

    if (newValue?.length > 50) {
      setSessionNameError('Test Name should not be greater than 50 characters');
    } else {
      setSessionNameError('');
    }
  };

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const navigateToStep = (stepNumber) => {
    dispatch(setCurrentSetupStep(stepNumber));
  };

  const startTestSession = () => {
    dispatch(triggerSession(navigateToPath, sessionName));
  };

  useEffect(() => {
    sessionNameChanged({
      target: { value: getDefaultAutoGenerateName(selectedDevice, selectedApp) }
    });
  }, [selectedApp, selectedDevice]);

  return {
    selectedDevice,
    selectedApp,
    navigateToStep,
    startTestSession,
    sessionName,
    sessionNameChanged,
    sessionNameError,
    isSessionApiLoading
  };
};

export default useConfirmStartTesting;
