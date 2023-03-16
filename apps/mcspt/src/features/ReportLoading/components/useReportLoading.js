import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { REPORT_LOADING_STATES } from 'constants/mcpConstants';
import { getSelectedDevice, getSessionDetails } from 'features/Home';

import {
  getIsSessionStopInProgress,
  getLatestSessionStatus
} from '../slices/reportLoadingSlice';
import {
  checkSessionStatus,
  stopRecordingSession
} from '../slices/reportLoadingThunks';

const sessionStateTextMap = {
  [REPORT_LOADING_STATES.CONNECTING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.LAUNCHING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.RECORDING]:
    'Recording started.\nTraverse through critical app flows on the connected device.',
  [REPORT_LOADING_STATES.STOPPING]:
    'Performance report is being generated.\nDo not unlug your device.'
};

const generateTestDataDescriptionList = (deviceDetails) => [
  {
    title: 'Device Model',
    description: deviceDetails?.model || 'N.A'
  },
  {
    title: 'OS Version',
    description: deviceDetails?.osVersion || 'N.A'
  },
  {
    title: 'Resolution',
    description: deviceDetails?.resolution || 'N.A'
  },
  {
    title: 'CPU Details',
    description: deviceDetails?.cpu || 'N.A'
  },
  {
    title: 'RAM Details',
    description: deviceDetails?.ram || 'N.A'
  },
  {
    title: 'Wifi/Cellular',
    description: 'N.A'
  }
];

const useReportLoading = () => {
  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);
  const selectedDevice = useSelector(getSelectedDevice);

  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [testDataDescriptionList, setTestDataDescriptionList] = useState(null);

  const [showGenerateReportPrompt, setShowGenerateReportPrompt] =
    useState(false);

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
    setTestDataDescriptionList(generateTestDataDescriptionList(selectedDevice));
  }, [selectedDevice]);

  useEffect(() => {
    if (sessionDetails?.cellular) {
      setTestDataDescriptionList((existingList) => {
        if (existingList?.length > 0) {
          const updatedVal = [...existingList];

          updatedVal[updatedVal.length - 1].description =
            sessionDetails?.cellular;

          return updatedVal;
        }
        return existingList;
      });
    }
  }, [sessionDetails]);

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
    dispatch(checkSessionStatus());
  }, [dispatch]);

  useEffect(
    () => () => {
      clearInterval(timerIntervalId);
    },
    [timerIntervalId]
  );

  return {
    sessionState,
    sessionDetails,
    sessionStateTextMap,
    onCancelClicked,
    stopSessionClicked,
    secondsElapsed,
    isSessionStopInProgress,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    testDataDescriptionList
  };
};

export default useReportLoading;
