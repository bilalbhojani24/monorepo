import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  authToken: null,
  userDetails: null,
  generalAnalytics: null
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
    setGeneralAnalytics: (state, action) => {
      state.generalAnalytics = action.payload;
    }
  }
});

// reducers
export const getAuthToken = (state) => state.dashboard?.authToken;
export const getUserData = (state) => state.dashboard?.userDetails;
export const getIsUserLoggedIn = (state) => !!state.dashboard?.userDetails?.id;
export const getGeneralAnalytics = (state) => state.dashboard?.generalAnalytics;

// Action creators are generated for each case reducer function
export const { setAuthToken, setUserDetails, setGeneralAnalytics } =
  dashboardSlice.actions;

export default dashboardSlice.reducer;
