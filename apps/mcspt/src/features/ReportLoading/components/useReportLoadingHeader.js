import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { secondsToMinutes } from '@browserstack/mcp-shared';
import REPORT_GENERATION_MODES from 'constants/reportGenerationModes';
import { getSessionDetails } from 'features/Home';

import {
  getIsSessionStopInProgress,
  getLatestSessionStatus,
  getRecordingDurationElapsed,
  getShowTimeoutBanner,
  setShowTimeoutBanner
} from '../slices/reportLoadingSlice';
import { stopRecordingSession } from '../slices/reportLoadingThunks';

const getNumberOfSecondsFromTimeoutDuration = (timeout) => timeout * 60;

const useReportLoadingHeader = () => {
  const dispatch = useDispatch();
  const navigateToPath = useNavigate();

  const sessionState = useSelector(getLatestSessionStatus);
  const sessionDetails = useSelector(getSessionDetails);
  const showTimeoutBanner = useSelector(getShowTimeoutBanner);
  const secondsElapsed = useSelector(getRecordingDurationElapsed);
  const isStopSessionInProgress = useSelector(getIsSessionStopInProgress);

  useEffect(() => {
    if (sessionDetails?.timeoutDurationInMinutes) {
      const timeoutDuration = getNumberOfSecondsFromTimeoutDuration(
        sessionDetails.timeoutDurationInMinutes
      );

      if (timeoutDuration - secondsElapsed === 120) {
        dispatch(setShowTimeoutBanner(true));
      }

      if (secondsElapsed === timeoutDuration && !isStopSessionInProgress) {
        dispatch(
          stopRecordingSession(
            navigateToPath,
            REPORT_GENERATION_MODES.TIMEOUT_OCCURRED
          )
        );
      }
    }
  }, [
    secondsElapsed,
    sessionDetails?.timeoutDurationInMinutes,
    dispatch,
    navigateToPath,
    isStopSessionInProgress
  ]);

  const getBannerDescription = useCallback(
    (elapsed) => {
      if (sessionDetails?.timeoutDurationInMinutes) {
        const timeoutDuration = getNumberOfSecondsFromTimeoutDuration(
          sessionDetails.timeoutDurationInMinutes
        );

        return `Your session will be terminated automatically in ${secondsToMinutes(
          timeoutDuration - elapsed
        )} minutes. Sessions can run for a maximum of ${secondsToMinutes(
          timeoutDuration
        )} minutes.`;
      }

      return '';
    },
    [sessionDetails?.timeoutDurationInMinutes]
  );

  return {
    sessionState,
    sessionDetails,
    showTimeoutBanner,
    secondsElapsed,
    getBannerDescription
  };
};

export default useReportLoadingHeader;
