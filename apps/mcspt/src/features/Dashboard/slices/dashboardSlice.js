import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
  userDetails: null,
  totalAllowedSessions: 0,
  totalCompletedSessions: 0
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setSessionAuthMetaData: (state, action) => ({
      ...state,
      ...action?.payload
    })
  }
});

// reducers
export const getAuthToken = (state) => state.dashboard?.authToken;
export const getUserData = (state) => state.dashboard?.userDetails;
export const getIsUserLoggedIn = (state) => !!state.dashboard?.userDetails?.id;
export const getTotalAllowedSessions = (state) =>
  state.dashboard?.totalAllowedSessions;
export const getTotalCompletedSessions = (state) =>
  state.dashboard?.totalCompletedSessions;

// Action creators are generated for each case reducer function
export const { setAuthToken, setUserDetails, setSessionAuthMetaData } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
