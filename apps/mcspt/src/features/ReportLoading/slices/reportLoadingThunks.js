import { fetchSessionStatus, stopSession } from 'api/reportLoading';
import { REPORT_LOADING_STATES } from 'constants/mcpConstants';
import { resetSessionSetupData } from 'features/Home';
import { updateSessionMetrics } from 'features/Report';

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

      dispatch(updateSessionStatus({ status: REPORT_LOADING_STATES.STOPPING })); // this needs to come from api later

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

export const cancelRecordingSession =
  (navigationCallback, closeModalCallback) => async (dispatch, getState) => {
    try {
      const currentSessionId =
        getState()?.newPerformanceSession?.sessionDetails?.sessionID;

      dispatch(setIsSessionStopInProgress(true));

      dispatch(
        updateSessionStatus({ status: REPORT_LOADING_STATES.NOT_STARTED })
      );

      await stopSession(currentSessionId);
    } catch (error) {
      if (error?.response?.status === 500) {
        throw error;
      }
    } finally {
      closeModalCallback();
      navigationCallback('/');
      dispatch(setIsSessionStopInProgress(false));
      dispatch(resetSessionSetupData());
    }
  };
