import { MCP_ROUTES } from 'constants/routeConstants';
import { getIsUserLoggedIn } from 'features/Dashboard';
import { getTotalAllowedSessions } from 'features/Dashboard/slices/dashboardSlice';
import { checkForPreviousUserSessions } from 'features/TestHistory';

import { checkAuthAndSaveUserDetails } from '../../Dashboard/slices/dashboardThunks';

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
        // login failed
      }

      const isLoggedIn = getIsUserLoggedIn(getState());
      const allowedSessions = getTotalAllowedSessions(getState());

      if (allowedSessions > 0 || isLoggedIn) {
        navigatorCallback(MCP_ROUTES.HOME);
      } else {
        dispatch(setAuthWall(true));
      }
    } catch (e) {
      // console.log(e);
    } finally {
      dispatch(setIsAuthWallChecked(true));
    }
  };
