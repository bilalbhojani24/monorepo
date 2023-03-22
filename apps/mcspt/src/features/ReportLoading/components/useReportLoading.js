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
import {
  cycledTipMessages,
  generateTestDataDescriptionList
} from '../utils/reportLoadingUtils';

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
