import { fetchSessionById, fetchSessions } from '../../../api/home';
import { updateSessionMetrics } from '../../Report';

import { setPreviousUserSessions } from './homeSlice';

export const checkForPreviousUserSessions = () => async (dispatch) => {
  try {
    const response = await fetchSessions();

    if (response.status === 'success') {
      dispatch(setPreviousUserSessions(response.sessions));
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
