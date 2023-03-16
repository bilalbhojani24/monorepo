import {
  fetchLatestToken,
  fetchUserDetails,
  userLogOut
} from 'api/authentication';

import { getAuthToken, setAuthToken, setUserDetails } from './dashboardSlice';

export const checkAuthAndSaveUserDetails =
  (ssoRedirectUrl) => async (dispatch, getState) => {
    try {
      let userDetailsResponse;

      if (ssoRedirectUrl) {
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
        } else {
          throw userDetailsResponse;
        }
      }
    } catch (e) {
      // console.log(e);
    }
  };

export const logUserOutAndPurgeSessionData = () => async (dispatch) => {
  try {
    const logOutResponse = await userLogOut();

    if (logOutResponse?.status === 200) {
      dispatch(setAuthToken(null));
      dispatch(setUserDetails(null));
    }
  } catch (e) {
    // console.log(e);
  }
};
