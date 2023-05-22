import { createSlice } from '@reduxjs/toolkit';

import { getLogDetailsThunk } from '../api';
import { LOADING_STATUS } from '../constants/loadingConstants';

const initialState = {
  data: {},
  error: null,
  isSlideoverOpen: false,
  loading: LOADING_STATUS.IDLE
};

export const logDetailsSlice = createSlice({
  name: 'logDetails',
  initialState,
  reducers: {
    openLogDetailsSlideover: (state) => {
      state.isSlideoverOpen = true;
    },
    closeLogDetailsSlideover: (state) => {
      state.isSlideoverOpen = false;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getLogDetailsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getLogDetailsThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      state.data = action.payload;
    });
    builder.addCase(getLogDetailsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export const { openLogDetailsSlideover, closeLogDetailsSlideover } =
  logDetailsSlice.actions;

export default logDetailsSlice.reducer;

export const logDetailsLoadingSelector = (state) => state.logDetails.loading;
export const logDetailsErrorSelector = (state) => state.logDetails.error;
export const logDetailsSelector = (state) => state.logDetails.data;
export const isLogDetailsSlideoverOpenSelector = (state) =>
  state.logDetails.isSlideoverOpen;
