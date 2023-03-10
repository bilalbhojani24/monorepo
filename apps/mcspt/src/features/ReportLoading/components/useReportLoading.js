import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  getSelectedApplication,
  getSelectedDevice,
  getSessionDetails
} from 'features/NewPerformanceSession';
import { REPORT_LOADING_STATES } from 'constants/mcpConstants';
import {
  getIsSessionStopInProgress,
  getLatestSessionStatus
} from '../slices/reportLoadingSlice';
import {
  checkSessionStatus,
  stopRecordingSession
} from '../slices/reportLoadingThunks';

const generateSessionTextMap = (device, application) => ({
  [REPORT_LOADING_STATES.CONNECTING]: `Connecting to the ${device?.manufacturer} ${device?.model}...`,
  [REPORT_LOADING_STATES.LAUNCHING]: `Launching the ${application?.name} app...`,
  [REPORT_LOADING_STATES.RECORDING]:
    'Performance Data is being recorded from your device'
});

const useReportLoading = () => {
  const sessionState = useSelector(getLatestSessionStatus);

  const sessionDetails = useSelector(getSessionDetails);
  const selectedDevice = useSelector(getSelectedDevice);
  const selectedApplication = useSelector(getSelectedApplication);

  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);

  const [sesstionTextMap, setSessionTextMap] = useState(null);
  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const onCancelClicked = () => {
    navigateToPath('/');
  };

  const stopSessionClicked = () => {
    clearInterval(timerIntervalId);
    dispatch(stopRecordingSession(navigateToPath));
  };

  useEffect(() => {
    dispatch(checkSessionStatus());
  }, [dispatch]);

  useEffect(() => {
    if (sessionState === REPORT_LOADING_STATES.RECORDING) {
      setTimerIntervalId(
        setInterval(() => {
          setSecondsElapsed((prev) => prev + 1);
        }, 1000)
      );
    }

    return undefined;
  }, [sessionState]);

  useEffect(() => {
    setSessionTextMap(
      generateSessionTextMap(selectedDevice, selectedApplication)
    );
  }, [selectedApplication, selectedDevice]);

  useEffect(
    () => () => {
      clearInterval(timerIntervalId);
    },
    [timerIntervalId]
  );

  return {
    sessionState,
    sessionDetails,
    selectedDevice,
    sesstionTextMap,
    selectedApplication,
    onCancelClicked,
    stopSessionClicked,
    secondsElapsed,
    isSessionStopInProgress
  };
};

export default useReportLoading;
