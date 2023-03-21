import { createSlice } from '@reduxjs/toolkit';

import { fetchTokenThunk } from '../../api';

import { LOADING_STATUS } from './constants';

const initialState = {
  uatUrl: '', // user access token URL
  hasToken: false,
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const userAuthSlice = createSlice({
  name: 'userAuth',
  initialState,
  reducers: {
    setUATUrl: (state, action) => {
      state.uatUrl = action.payload;
    },
    setHasToken: (state, action) => {
      state.hasToken = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTokenThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(fetchTokenThunk.fulfilled, (state) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
    });
    builder.addCase(fetchTokenThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action;
    });
  }
});

export const { setUATUrl, setHasToken } = userAuthSlice.actions;

export default userAuthSlice.reducer;

export const uatUrlSelector = (state) => state.userAuth.uatUrl;
export const hasTokenSelector = (state) => state.userAuth.hasToken;
export const userAuthLoadingSelector = (state) => state.userAuth.loading;
export const userAuthErrorSelector = (state) => state.userAuth.error;
