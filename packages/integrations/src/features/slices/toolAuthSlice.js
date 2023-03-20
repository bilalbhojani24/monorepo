import { createSlice } from '@reduxjs/toolkit';

import { getTokenConnectionForToolThunk } from '../../api';

import { LOADING_STATUS } from './constants';

const initialState = {
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const toolAuthSlice = createSlice({
  name: 'toolAuth',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getTokenConnectionForToolThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getTokenConnectionForToolThunk.fulfilled, (state) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
    });
    builder.addCase(
      getTokenConnectionForToolThunk.rejected,
      (state, action) => {
        state.loading = LOADING_STATUS.FAILED;
        state.error = action;
      }
    );
  }
});

export default toolAuthSlice.reducer;

export const toolAuthLoadingSelector = (state) => state.toolAuth.loading;
export const toolAuthErrorSelector = (state) => state.toolAuth.error;
