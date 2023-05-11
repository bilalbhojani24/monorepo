import {
  confirmLoginForReverseSync,
  fetchGeneralAnalytics,
  fetchLatestToken,
  fetchUserDetails,
  saveUserFeedback,
  userLogOut
} from 'api/authentication';
import { updateAndInitiateAnalytics } from 'utils/analyticsUtils';
import { purgeAmplitudeMemory, reloadRootRoute } from 'utils/baseUtils';

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
      updateAndInitiateAnalytics(analyticsResponse.data);
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

        userDetailsResponse = await fetchUserDetails('ssoRedirect');

        if (userDetailsResponse?.status === 200) {
          // reverse syncing reports if user is logged in
          await confirmLoginForReverseSync();
        }

        /**
         * We do this one line of indomitable sin here because
         * central-FE wont provide a way to re-initialize anayltics instances,
         * neither do they allow to use sdks directly,
         * but PM wants to release feature at the earliest.
         */

        purgeAmplitudeMemory();
        reloadRootRoute();
      }

      if (!ssoRedirectUrl && !getAuthToken(getState())) {
        const latestTokenResponse = await fetchLatestToken();

        if (latestTokenResponse?.status === 200) {
          dispatch(setAuthToken(latestTokenResponse?.data?.token));

          userDetailsResponse = await fetchUserDetails();
        }
      }

      if (userDetailsResponse) {
        if (userDetailsResponse?.status === 200) {
          dispatch(setUserDetails(userDetailsResponse?.data));
        } else {
          throw userDetailsResponse;
        }
      }
    } catch (e) {
      // handle login errors after PM defines scenario
    } finally {
      dispatch(setShowAuthLoadingModal(false));
      await dispatch(checkGeneralAnalytics());
    }
  };

export const logUserOutAndPurgeSessionData = () => async (dispatch) => {
  try {
    dispatch(setAuthModalStatusText('Logging Out'));
    dispatch(setShowAuthLoadingModal(true));

    await userLogOut();
  } catch (e) {
    // handle logout errors after PM defines scenario
  } finally {
    dispatch(setShowAuthLoadingModal(false));
    /**
     * We do this one line of indomitable sin here because
     * central-FE wont provide a way to re-initialize anayltics instances,
     * neither do they allow to use sdks directly,
     * but PM wants to release feature at the earliest.
     */
    purgeAmplitudeMemory();
    reloadRootRoute();
  }
};

export const submitUserFeedback = (rqdata) => async () => {
  try {
    await saveUserFeedback(rqdata);
  } catch (error) {
    // silent error for feedback failure until PM defines scenario
  }
};
