import { fetchSessionById, fetchSessions } from 'api/testHistory';
import { setSessionAuthMetaData } from 'features/Dashboard/slices/dashboardSlice';
import { fetchConnectedDevices } from 'features/Home';
import { updateSessionMetrics } from 'features/Report';

import { setPreviousUserSessions } from './testHistorySlice';

export const checkForPreviousUserSessions = () => async (dispatch) => {
  try {
    const response = await fetchSessions();

    if (response.status === 'success') {
      dispatch(setPreviousUserSessions(response.sessions));
      dispatch(setSessionAuthMetaData(response.metadata));

      dispatch(fetchConnectedDevices());
    } else {
      throw response;
    }
  } catch (e) {
    // handle error
  }
};

export const extractSessionDetailsById =
  (sessionId, navigatorCallback) => async (dispatch) => {
    try {
      const response = await fetchSessionById(sessionId);

      if (response.status === 'success') {
        dispatch(updateSessionMetrics(response));

        navigatorCallback('/report');
      } else {
        throw response;
      }
    } catch (e) {
      // handle error
    }
  };
