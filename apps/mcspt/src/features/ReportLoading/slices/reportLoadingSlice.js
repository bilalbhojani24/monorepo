import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestSessionStatus: 'not_started',
  latestPollingTimeoutId: undefined,
  isSessionStopInProgress: false,
  recordingTimerIntervalId: null,
  recordingDurationElapsed: 0,
  showBanner: false
};

export const reportLoadingSlice = createSlice({
  name: 'reportLoading',
  initialState,
  reducers: {
    updateSessionStatus: (state, action) => {
      state.latestSessionStatus = action.payload.status;
      state.latestPollingTimeoutId = action.payload.latestPollingTimeoutId;
    },

    setIsSessionStopInProgress: (state, action) => {
      state.isSessionStopInProgress = action.payload;
    },

    setRecordingTimerIntervalId: (state, action) => {
      if (action.payload === null && state.recordingTimerIntervalId !== null) {
        clearInterval(state.recordingTimerIntervalId);
      }

      state.recordingTimerIntervalId = action.payload;
    },

    addElapsedRecordingDuration: (state, action) => {
      state.recordingDurationElapsed += action.payload;
    },

    setElapsedRecordingDuration: (state, action) => {
      state.recordingDurationElapsed = action.payload;
    },

    setShowTimeoutBanner: (state, action) => {
      state.showTimeoutBanner = action.payload;
    }
  }
});

export const getLatestSessionStatus = (state) =>
  state.reportLoading.latestSessionStatus;

export const getIsSessionStopInProgress = (state) =>
  state.reportLoading.isSessionStopInProgress;

export const getRecordingTimerIntervalId = (state) =>
  state.reportLoading.recordingTimerIntervalId;

export const getRecordingDurationElapsed = (state) =>
  state.reportLoading.recordingDurationElapsed;

export const getShowTimeoutBanner = (state) =>
  state.reportLoading.showTimeoutBanner;

// Action creators are generated for each case reducer function
export const {
  updateSessionStatus,
  setIsSessionStopInProgress,
  setRecordingTimerIntervalId,
  addElapsedRecordingDuration,
  setShowTimeoutBanner,
  setElapsedRecordingDuration
} = reportLoadingSlice.actions;

export default reportLoadingSlice.reducer;
