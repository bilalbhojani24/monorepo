import { createSlice } from '@reduxjs/toolkit';

import { getIntegrationsThunk } from '../../api/index';

import { LOADING_STATUS } from './constants';

const initialState = {
  listOfIntegrations: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIntegrationsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.listOfIntegrations = [];
      state.error = null;
    });
    builder.addCase(getIntegrationsThunk.fulfilled, (state, action) => {
      const integrations = action.payload.data?.integrations ?? [];
      state.loading = LOADING_STATUS.SUCCEEDED;
      state.listOfIntegrations = integrations;
    });
    builder.addCase(getIntegrationsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.payload;
    });
  }
});

export default integrationsSlice.reducer;

export const integrationsSelector = (state) =>
  state.integrations.listOfIntegrations;
export const integrationsLoadingSelector = (state) =>
  state.integrations.loading;
export const integrationsHasErrorSelecor = (state) => state.integrations.error;
