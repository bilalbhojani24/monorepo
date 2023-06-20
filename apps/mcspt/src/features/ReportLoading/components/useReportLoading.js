import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  formatDeviceAndAppAnalyticsData,
  mcpAnalyticsEvent
} from '@browserstack/mcp-shared';
import { getSessionDetails } from 'features/Home';

import {
  getRecordingDurationElapsed,
  setRecordingTimerIntervalId
} from '../slices/reportLoadingSlice';
import {
  cancelRecordingSession,
  checkSessionStatus,
  stopRecordingSession
} from '../slices/reportLoadingThunks';

const useReportLoading = () => {
  const sessionDetails = useSelector(getSessionDetails);
  const secondsElapsed = useSelector(getRecordingDurationElapsed);

  const [showGenerateReportPrompt, setShowGenerateReportPrompt] =
    useState(false);

  const [showQuitTestingPrompt, setShowQuitTestingPrompt] = useState(false);

  const dispatch = useDispatch();

  const navigateToPath = useNavigate();

  const quitTestConfirmed = () => {
    dispatch(setRecordingTimerIntervalId(null));

    dispatch(
      cancelRecordingSession(navigateToPath, () => {
        setShowQuitTestingPrompt(false);
      })
    );

    mcpAnalyticsEvent('csptTestQuitClicked', {
      test_duration: secondsElapsed,
      ...formatDeviceAndAppAnalyticsData(
        sessionDetails?.device,
        sessionDetails?.package
      )
    });
  };

  const stopSessionClicked = () => {
    setShowGenerateReportPrompt(false);

    dispatch(stopRecordingSession(navigateToPath));
    mcpAnalyticsEvent('csptTestGenerateReportClicked', {
      test_duration: secondsElapsed,
      ...formatDeviceAndAppAnalyticsData(
        sessionDetails?.device,
        sessionDetails?.package
      )
    });
  };

  useEffect(() => {
    dispatch(checkSessionStatus());
  }, [dispatch]);

  return {
    quitTestConfirmed,
    stopSessionClicked,
    showGenerateReportPrompt,
    setShowGenerateReportPrompt,
    showQuitTestingPrompt,
    setShowQuitTestingPrompt
  };
};

export default useReportLoading;
