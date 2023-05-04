import { getIsUserLoggedIn } from 'features/Dashboard';
import { getTotalAllowedSessions } from 'features/Dashboard/slices/dashboardSlice';
import { checkForPreviousUserSessions } from 'features/TestHistory';

import { checkAuthAndSaveUserDetails } from '../../Dashboard/slices/dashboardThunks';

export const checkHistoryAndUserForAuthWall =
  (navigatorCallback) => async (dispatch, getState) => {
    try {
      /**
       * we do this function call on the line below because BE
       * refuses to give standalone API to check free user sessions.
       */
      await dispatch(checkForPreviousUserSessions());

      await dispatch(checkAuthAndSaveUserDetails());

      const isLoggedIn = getIsUserLoggedIn(getState());
      const allowedSessions = getTotalAllowedSessions(getState());

      if (allowedSessions === 0 && !isLoggedIn) {
        // activateAuthwall
      } else {
        navigatorCallback('/');
      }
    } catch (e) {
      // console.log(e);
    }
  };
