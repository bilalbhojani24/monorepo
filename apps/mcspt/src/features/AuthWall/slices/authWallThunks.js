import { MCP_ROUTES } from 'constants/routeConstants';
import {
  checkAuthAndSaveUserDetails,
  getIsUserLoggedIn,
  getTotalAllowedSessions
} from 'features/Dashboard';
import { checkForPreviousUserSessions } from 'features/TestHistory';

import { setAuthWall, setIsAuthWallChecked } from './authWallSlice';

export const checkHistoryAndUserForAuthWall =
  (navigatorCallback) => async (dispatch, getState) => {
    try {
      /**
       * we do this function call on the line below because BE
       * refuses to give standalone API to check free user sessions.
       */
      await dispatch(checkForPreviousUserSessions());

      try {
        await dispatch(checkAuthAndSaveUserDetails());
      } catch (e) {
        // silent error until PM defines Scenario
      }

      const isLoggedIn = getIsUserLoggedIn(getState());
      const allowedSessions = getTotalAllowedSessions(getState());

      if (allowedSessions > 0 || isLoggedIn) {
        navigatorCallback(MCP_ROUTES.HOME);
      } else {
        dispatch(setAuthWall(true));
      }
    } catch (e) {
      // handle error when PM defines Scenario
    } finally {
      dispatch(setIsAuthWallChecked(true));
    }
  };
