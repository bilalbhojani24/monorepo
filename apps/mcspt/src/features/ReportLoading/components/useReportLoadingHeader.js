import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getSessionDetails } from 'features/Home';

import {
  getLatestSessionStatus,
  getRecordingDurationElapsed,
  getShowTimeoutBanner,
  setElapsedRecordingDuration,
  setRecordingTimerIntervalId,
  setShowTimeoutBanner
} from '../slices/reportLoadingSlice';
import { stopRecordingSession } from '../slices/reportLoadingThunks';

const useReportLoadingHeader = () => {
  const dispatch = useDispatch();
  const navigateToPath = useNavigate();
  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const showTimeoutBanner = useSelector(getShowTimeoutBanner);
  const secondsElapsed = useSelector(getRecordingDurationElapsed);

  const hideBanner = () => {
    dispatch(setShowTimeoutBanner(false));
  };

  useEffect(() => {
    if (sessionDetails.timeoutDurationInMinutes * 60 - secondsElapsed === 30) {
      dispatch(setShowTimeoutBanner(true));
    }

    if (secondsElapsed === sessionDetails.timeoutDurationInMinutes * 60) {
      dispatch(setShowTimeoutBanner(false));
      dispatch(setRecordingTimerIntervalId(null));
      dispatch(setElapsedRecordingDuration(0));
      dispatch(stopRecordingSession(navigateToPath, 'timeout'));
    }
  }, [
    secondsElapsed,
    sessionDetails.timeoutDurationInMinutes,
    dispatch,
    navigateToPath
  ]);

  return {
    sessionState,
    sessionDetails,
    showTimeoutBanner,
    secondsElapsed,
    hideBanner
  };
};

export default useReportLoadingHeader;
