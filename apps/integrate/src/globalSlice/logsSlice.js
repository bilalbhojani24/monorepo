import { createSlice } from '@reduxjs/toolkit';

import { getLogsThunk } from '../api';
import { LOADING_STATUS } from '../constants/loadingConstants';

const initialState = {
  data: {},
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const logsSlice = createSlice({
  name: 'logs',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getLogsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getLogsThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(getLogsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export default logsSlice.reducer;

export const logsLoadingSelector = (state) => state.logs.loading;
export const logsErrorSelector = (state) => state.logs.error;
export const logsSelector = (state) => state.logs.data;
