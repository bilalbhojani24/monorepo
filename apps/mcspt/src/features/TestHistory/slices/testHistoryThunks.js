import {
  fetchSampleSessionById,
  fetchSampleSessions,
  fetchSessionById,
  fetchSessions
} from 'api/testHistory';
import { setSessionAuthMetaData } from 'features/Dashboard/slices/dashboardSlice';
import { fetchConnectedDevices } from 'features/Home';
import {
  setPreviousRouteForReport,
  updateSessionMetrics
} from 'features/Report';
import { decideCurrentRoute } from 'utils/baseUtils';

import {
  setAreSampleReportsLoading,
  setIsTestHistoryLoading,
  setPreviousUserSessions,
  setSampleReports,
  setShowHistoricalReportLoadingModal
} from './testHistorySlice';

export const checkForPreviousUserSessions =
  (refetchDevices) => async (dispatch) => {
    try {
      dispatch(setIsTestHistoryLoading(true));

      const response = await fetchSessions();

      if (response.status === 'success') {
        dispatch(setPreviousUserSessions(response.sessions));
        dispatch(setSessionAuthMetaData(response.metadata));

        if (refetchDevices) {
          dispatch(fetchConnectedDevices());
        }
      } else {
        throw response;
      }
    } catch (e) {
      // handle error
    } finally {
      dispatch(setIsTestHistoryLoading(false));
    }
  };

export const extractSessionDetailsById =
  (sessionId, navigatorCallback) => async (dispatch) => {
    try {
      dispatch(setShowHistoricalReportLoadingModal(true));

      const response = await fetchSessionById(sessionId);

      if (response.status === 'success') {
        dispatch(updateSessionMetrics(response));

        dispatch(setPreviousRouteForReport(decideCurrentRoute()));

        navigatorCallback('/report');
      } else {
        throw response;
      }
    } catch (e) {
      // handle error
    } finally {
      dispatch(setShowHistoricalReportLoadingModal(false));
    }
  };

export const checkForSampleReports = () => async (dispatch) => {
  try {
    dispatch(setAreSampleReportsLoading(true));

    const response = await fetchSampleSessions();

    if (response.status === 'success') {
      dispatch(setSampleReports(response.sessions));
    } else {
      throw response;
    }
  } catch (e) {
    // handle error
  } finally {
    dispatch(setAreSampleReportsLoading(false));
  }
};

export const nevigateToSampleReport =
  (sessionId, navigatorCallback) => async (dispatch) => {
    try {
      dispatch(setShowHistoricalReportLoadingModal(true));

      const response = await fetchSampleSessionById(sessionId);

      if (response.status === 'success') {
        dispatch(updateSessionMetrics(response));

        dispatch(setPreviousRouteForReport(decideCurrentRoute()));

        navigatorCallback('/report');
      } else {
        throw response;
      }
    } catch (e) {
      // handle error
    } finally {
      dispatch(setShowHistoricalReportLoadingModal(false));
    }
  };
