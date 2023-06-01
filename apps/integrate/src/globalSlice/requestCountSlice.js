import { createSlice } from '@reduxjs/toolkit';
import { getRequestCountThunk } from 'api/requestCount';
import { LOADING_STATUS } from 'constants/loadingConstants';

const initialState = {
  total: 0,
  requests: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const requestCountSlice = createSlice({
  name: 'requestCount',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getRequestCountThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getRequestCountThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      state.total = action.payload.total;
      state.requests = action.payload.count;
    });
    builder.addCase(getRequestCountThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export default requestCountSlice.reducer;

export const requestCountLoadingSelector = (state) =>
  state.requestCount.loading;
export const requestCountErrorSelector = (state) => state.requestCount.error;
export const requestCountSelector = (state) => ({
  total: state.requestCount.total,
  requests: state.requestCount.requests
});
