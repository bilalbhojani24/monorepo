import { fetchSessionById, fetchSessions } from 'api/testHistory';
import { setSessionAuthMetaData } from 'features/Dashboard/slices/dashboardSlice';
import { fetchConnectedDevices } from 'features/Home';
import { updateSessionMetrics } from 'features/Report';

import {
  setIsTestHistoryLoading,
  setPreviousUserSessions,
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
