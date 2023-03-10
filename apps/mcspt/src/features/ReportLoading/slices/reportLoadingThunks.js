import { fetchSessionStatus, stopSession } from '../../../api/reportLoading';
import { resetSessionSetupData } from '../../NewPerformanceSession';
import { updateSessionMetrics } from '../../Report';
import { REPORT_LOADING_STATES } from 'constants/mcpConstants';

import {
  setIsSessionStopInProgress,
  updateSessionStatus
} from './reportLoadingSlice';

export const checkSessionStatus = () => async (dispatch, getState) => {
  try {
    const currentSessionId =
      getState()?.newPerformanceSession?.sessionDetails?.sessionID;

    const response = await fetchSessionStatus(currentSessionId);

    if (response?.state === REPORT_LOADING_STATES.FAILED) {
      throw response;
    }

    if (response?.state !== REPORT_LOADING_STATES.COMPLETE) {
      const sessionStatusPollingTimeoutId = setTimeout(() => {
        dispatch(checkSessionStatus());
      }, 5000);

      dispatch(
        updateSessionStatus({
          status: response.state,
          latestPollingTimeoutId: sessionStatusPollingTimeoutId
        })
      );
    }

    if (response?.state === REPORT_LOADING_STATES.COMPLETE) {
      const latestSessionPollingTimeoutId =
        getState()?.reportLoading?.latestPollingTimeoutId;

      clearTimeout(latestSessionPollingTimeoutId);
    }
  } catch (error) {
    if (error?.response?.status !== 463) {
      throw error;
    }
  }
};

export const stopRecordingSession =
  (navigationCallback) => async (dispatch, getState) => {
    try {
      const currentSessionId =
        getState()?.newPerformanceSession?.sessionDetails?.sessionID;

      dispatch(setIsSessionStopInProgress(true));

      const response = await stopSession(currentSessionId);

      dispatch(updateSessionMetrics(response));

      dispatch(resetSessionSetupData());

      navigationCallback('/report');
    } catch (error) {
      if (error?.response?.status === 500) {
        throw error;
      }
    } finally {
      dispatch(setIsSessionStopInProgress(false));
    }
  };
