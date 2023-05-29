import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionData: {},
  latestSeekTimeInSeconds: undefined,
  latestVideoCurrentTimeInSeconds: 0,
  previousRouteForReport: '/'
};

export const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    updateSessionMetrics: (state, action) => {
      state.sessionData = action.payload;
    },
    updateLatestSeekTimeInSeconds: (state, action) => {
      let value = action.payload;

      if ((value !== 0 && Boolean(value)) || value === 0) {
        value = Math.round(value);
      } else {
        value = undefined;
      }

      state.latestSeekTimeInSeconds = value;
    },
    updateLatestVideoCurrentTimeInSeconds: (state, action) => {
      const value = action.payload;

      if ((value !== 0 && Boolean(value)) || value === 0) {
        state.latestVideoCurrentTimeInSeconds = value;
      }
    },
    setPreviousRouteForReport: (state, action) => {
      state.previousRouteForReport = action.payload;
    }
  }
});

export const getSessionMetrics = (state) => state.report.sessionData;
export const getLatestSeekTimeInSeconds = (state) =>
  state.report.latestSeekTimeInSeconds;
export const getLatestVideoCurrentTimeInSeconds = (state) =>
  state.report.latestVideoCurrentTimeInSeconds;
export const getDevicePlatform = (state) =>
  state.report?.sessionData?.device?.os;
export const getPreviousRouteForReport = (state) =>
  state.report?.previousRouteForReport;

// Action creators are generated for each case reducer function
export const {
  updateSessionMetrics,
  updateLatestSeekTimeInSeconds,
  updateLatestVideoCurrentTimeInSeconds,
  setPreviousRouteForReport
} = reportSlice.actions;

export default reportSlice.reducer;
