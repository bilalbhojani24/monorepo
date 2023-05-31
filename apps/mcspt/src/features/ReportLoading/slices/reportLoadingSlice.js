import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestSessionStatus: 'not_started',
  latestPollingTimeoutId: undefined,
  isSessionStopInProgress: false
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
    }
  }
});

export const getLatestSessionStatus = (state) =>
  state.reportLoading.latestSessionStatus;

export const getIsSessionStopInProgress = (state) =>
  state.reportLoading.isSessionStopInProgress;

// Action creators are generated for each case reducer function
export const { updateSessionStatus, setIsSessionStopInProgress } =
  reportLoadingSlice.actions;

export default reportLoadingSlice.reducer;
