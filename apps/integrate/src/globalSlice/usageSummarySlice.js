import { createSlice } from '@reduxjs/toolkit';
import { getUsageSummaryThunk } from 'api/usageSummary';
import { LOADING_STATUS } from 'constants/loadingConstants';

const initialState = {
  isSlideoverOpen: false,
  usageDetails: {},
  integrations: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const usageSummarySlice = createSlice({
  name: 'usageSummary',
  initialState,
  reducers: {
    openUsageSummarySlideover: (state) => {
      state.isSlideoverOpen = true;
    },
    closeUsageSummarySlideover: (state) => {
      state.isSlideoverOpen = false;
    },
    setUsageDetails: (state, action) => {
      state.usageDetails = action.payload;
    }
  },

  extraReducers: (builder) => {
    builder.addCase(getUsageSummaryThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getUsageSummaryThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      state.integrations = action.payload.integrations;
    });
    builder.addCase(getUsageSummaryThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export const {
  openUsageSummarySlideover,
  closeUsageSummarySlideover,
  setUsageDetails
} = usageSummarySlice.actions;

export default usageSummarySlice.reducer;

export const usageSummaryLoadingSelector = (state) =>
  state.usageSummary.loading;
export const usageSummaryErrorSelector = (state) => state.usageSummary.error;
export const usageSummarySelector = (state) => state.usageSummary.integrations;
export const isUsageSummarySlideoverOpenSelector = (state) =>
  state.usageSummary.isSlideoverOpen;
export const usageDetailsSelector = (state) => state.usageSummary.usageDetails;
