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
  cancelRecordingSession,
  checkSessionStatus,
  stopRecordingSession
} from '../slices/reportLoadingThunks';

const sessionStateTextMap = {
  [REPORT_LOADING_STATES.CONNECTING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.LAUNCHING]: `AppBench is warming up...`,
  [REPORT_LOADING_STATES.RECORDING]:
    'App profiling started.\nManually navigate critical app user journeys on the connected device.',
  [REPORT_LOADING_STATES.STOPPING]:
    'Almost there! AppBench is generating your report…\nEnsure the device remains connected.'
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
    title: 'Screen Resolution',
    description: deviceDetails?.resolution || 'N.A'
  },
  {
    title: 'CPU',
    description: deviceDetails?.cpu || 'N.A'
  },
  {
    title: 'RAM',
    description: deviceDetails?.ram || 'N.A'
  },
  {
    title: 'Network',
    description: 'N.A'
  }
];

const cycledTipMessages = [
  '21% decrease in Android app startup time led to 5% increase in driver sessions for Lyft.',
  'Reducing Jank issues led to 50% increase in user interaction for Swiggy',
  'Lowering ANRs led to 40% reduction in user complaints for MyJio app'
];

const useReportLoading = () => {
  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const isSessionStopInProgress = useSelector(getIsSessionStopInProgress);
  const selectedDevice = useSelector(getSelectedDevice);

  const [timerIntervalId, setTimerIntervalId] = useState(null);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [testDataDescriptionList, setTestDataDescriptionList] = useState(null);

  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const [showGenerateReportPrompt, setShowGenerateReportPrompt] =
    useState(false);

  const [showQuitTestingPrompt, setShowQuitTestingPrompt] = useState(false);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const quitTestConfirmed = () => {
    clearInterval(timerIntervalId);

    dispatch(
      cancelRecordingSession(navigateToPath, () => {
        setShowQuitTestingPrompt(false);
      })
    );
  };

  const stopSessionClicked = () => {
    clearInterval(timerIntervalId);
    setShowGenerateReportPrompt(false);
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

  useEffect(() => {
    const localTimeoutId = setInterval(() => {
      setCurrentTipIndex((prevIndex) => (prevIndex === 2 ? 0 : prevIndex + 1));
    }, 5000);

    return () => {
      clearTimeout(localTimeoutId);
    };
  }, []);

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
    quitTestConfirmed,
    stopSessionClicked,
    secondsElapsed,
    isSessionStopInProgress,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    showQuitTestingPrompt,
    setShowQuitTestingPrompt,
    testDataDescriptionList,
    selectedTipMsg: cycledTipMessages[currentTipIndex]
  };
};

export default useReportLoading;
