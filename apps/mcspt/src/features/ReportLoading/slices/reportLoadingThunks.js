import {
  formatDeviceAndAppAnalyticsData,
  mcpAnalyticsEvent,
  setPreviousRouteForReport,
  updateSessionMetrics
} from '@browserstack/mcp-shared';
import { fetchSessionStatus, stopSession } from 'api/reportLoading';
import REPORT_LOADING_STATES from 'constants/reportLoadingStates';
import { MCP_ROUTES } from 'constants/routeConstants';
import {
  getDeviceOfNewPerformanceSession,
  getSelectedApplication,
  resetSessionSetupData
} from 'features/Home';

import {
  getLatestSessionStatus,
  setIsSessionStopInProgress,
  updateSessionStatus
} from './reportLoadingSlice';

export const checkSessionStatus = () => async (dispatch, getState) => {
  try {
    const currentSessionId =
      getState()?.newPerformanceSession?.sessionDetails?.sessionID;

    const previousSessionState = getLatestSessionStatus(getState());
    const currentdevice = getDeviceOfNewPerformanceSession(getState());
    const currentapp = getSelectedApplication(getState());

    const response = await fetchSessionStatus(currentSessionId);

    if (response?.state === REPORT_LOADING_STATES.FAILED) {
      throw response;
    }

    if (
      previousSessionState === REPORT_LOADING_STATES.LAUNCHING &&
      response?.state === REPORT_LOADING_STATES.RECORDING
    ) {
      mcpAnalyticsEvent(
        'csptTestStartSuccess',
        formatDeviceAndAppAnalyticsData(currentdevice, currentapp)
      );
    }

    if (
      response?.state !== REPORT_LOADING_STATES.COMPLETE ||
      response?.state !== REPORT_LOADING_STATES.CANCELLED
    ) {
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

    if (
      response?.state === REPORT_LOADING_STATES.COMPLETE ||
      response?.state === REPORT_LOADING_STATES.CANCELLED
    ) {
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
    const currentSessionId =
      getState()?.newPerformanceSession?.sessionDetails?.sessionID;

    const currentdevice = getDeviceOfNewPerformanceSession(getState());
    const currentapp = getSelectedApplication(getState());

    try {
      dispatch(setIsSessionStopInProgress(true));

      dispatch(updateSessionStatus({ status: REPORT_LOADING_STATES.STOPPING })); // this needs to come from api later

      const response = await stopSession(currentSessionId);

      mcpAnalyticsEvent(
        'csptTestGenerateReportSuccess',
        formatDeviceAndAppAnalyticsData(currentdevice, currentapp)
      );

      await new Promise((resolve) => setTimeout(resolve, 4000));

      dispatch(updateSessionMetrics(response));

      dispatch(resetSessionSetupData());

      dispatch(setPreviousRouteForReport(MCP_ROUTES.HOME));

      navigationCallback(MCP_ROUTES.REPORT);
    } catch (error) {
      if (error?.response?.status !== 200) {
        mcpAnalyticsEvent(
          'csptTestGenerateReportFailure',
          formatDeviceAndAppAnalyticsData(currentdevice, currentapp)
        );
      }

      if (error?.response?.status === 500) {
        throw error;
      }
    } finally {
      dispatch(setIsSessionStopInProgress(false));
    }
  };

export const cancelRecordingSession =
  (navigationCallback, closeModalCallback) => async (dispatch, getState) => {
    const currentSessionId =
      getState()?.newPerformanceSession?.sessionDetails?.sessionID;

    try {
      dispatch(setIsSessionStopInProgress(true));

      dispatch(
        updateSessionStatus({ status: REPORT_LOADING_STATES.NOT_STARTED })
      );

      await stopSession(currentSessionId, { cancelled: true });
    } catch (error) {
      if (error?.response?.status === 500) {
        throw error;
      }
    } finally {
      closeModalCallback();
      navigationCallback(MCP_ROUTES.HOME);
      dispatch(setIsSessionStopInProgress(false));
      dispatch(resetSessionSetupData());
    }
  };
