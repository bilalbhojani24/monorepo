import { initLogger } from '@browserstack/utils';
import {
  confirmLoginForReverseSync,
  fetchGeneralAnalytics,
  fetchLatestToken,
  fetchUserDetails,
  userLogOut
} from 'api/authentication';
import { checkForPreviousUserSessions } from 'features/TestHistory';
import { ANALYTICS_KEYS } from 'utils/analyticsUtils';

import {
  getAuthToken,
  setAuthModalStatusText,
  setAuthToken,
  setGeneralAnalytics,
  setShowAuthLoadingModal,
  setUserDetails
} from './dashboardSlice';

export const checkGeneralAnalytics = () => async (dispatch) => {
  try {
    const analyticsResponse = await fetchGeneralAnalytics();

    if (analyticsResponse?.status === 200) {
      dispatch(setGeneralAnalytics(analyticsResponse.data));
      initLogger(ANALYTICS_KEYS);
    } else {
      throw analyticsResponse;
    }
  } catch (error) {
    // silently ignore analytics api error
  }
};

export const checkAuthAndSaveUserDetails =
  (ssoRedirectUrl) => async (dispatch, getState) => {
    try {
      let userDetailsResponse;

      if (ssoRedirectUrl) {
        dispatch(setAuthModalStatusText('Logging In'));
        dispatch(setShowAuthLoadingModal(true));

        const params = ssoRedirectUrl.split('?')[1];
        const loginToken = params?.split('=')[1];

        dispatch(setAuthToken(loginToken));

        userDetailsResponse = await fetchUserDetails();
      }

      if (!ssoRedirectUrl && !getAuthToken(getState())) {
        const latestTokenResponse = await fetchLatestToken();

        if (latestTokenResponse?.status === 200) {
          dispatch(setAuthToken(latestTokenResponse?.data?.token));

          userDetailsResponse = await fetchUserDetails();
        } else {
          throw latestTokenResponse;
        }
      }

      if (userDetailsResponse) {
        if (userDetailsResponse?.status === 200) {
          dispatch(setUserDetails(userDetailsResponse?.data));

          if (ssoRedirectUrl) {
            // reverse syncing reports if user is logged in
            await confirmLoginForReverseSync();
            await dispatch(checkForPreviousUserSessions(true));
          }
        } else {
          throw userDetailsResponse;
        }
      }
    } catch (e) {
      // handle login errors after PM defines scenario
    } finally {
      dispatch(setShowAuthLoadingModal(false));
      dispatch(checkGeneralAnalytics());
    }
  };

export const logUserOutAndPurgeSessionData = () => async (dispatch) => {
  try {
    dispatch(setAuthModalStatusText('Logging Out'));
    dispatch(setShowAuthLoadingModal(true));

    const logOutResponse = await userLogOut();

    if (logOutResponse?.status === 200) {
      dispatch(setAuthToken(null));
      dispatch(setUserDetails(null));
      await dispatch(checkForPreviousUserSessions(true));
    }
  } catch (e) {
    // handle logout errors after PM defines scenario
  } finally {
    dispatch(setShowAuthLoadingModal(false));
  }
};
