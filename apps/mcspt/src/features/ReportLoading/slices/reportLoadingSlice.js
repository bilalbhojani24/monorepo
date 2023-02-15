import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  latestSessionStatus: 'not_started',
  latestPollingTimeoutId: undefined
};

export const reportLoadingSlice = createSlice({
  name: 'reportLoading',
  initialState,
  reducers: {
    updateSessionStatus: (state, action) => {
      state.latestSessionStatus = action.payload.status;
      state.latestPollingTimeoutId = action.payload.latestPollingTimeoutId;
    }
  }
});

export const getLatestSessionStatus = (state) =>
  state.reportLoading.latestSessionStatus;

// Action creators are generated for each case reducer function
export const { updateSessionStatus } = reportLoadingSlice.actions;

export default reportLoadingSlice.reducer;
