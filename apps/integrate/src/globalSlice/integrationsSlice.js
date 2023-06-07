import { createSlice } from '@reduxjs/toolkit';
import { getIntegrationsThunk } from 'api/integrations';
import { LOADING_STATUS } from 'constants/loadingConstants';

const initialState = {
  integrations: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getIntegrationsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getIntegrationsThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      const { integrations } = action.payload || {};
      if (Array.isArray(integrations)) {
        state.integrations = integrations.map(({ key: value, label }) => ({
          value,
          label
        }));
      }
    });
    builder.addCase(getIntegrationsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export default integrationsSlice.reducer;

export const integrationsLoadingSelector = (state) =>
  state.integrations.loading;
export const integrationsErrorSelector = (state) => state.integrations.error;
export const integrationsSelector = (state) => state.integrations.integrations;
