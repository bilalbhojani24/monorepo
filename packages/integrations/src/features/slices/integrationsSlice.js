import { createSlice } from '@reduxjs/toolkit';

import { getIntegrationsThunk } from '../../api/index';

const initialState = {
  listOfIntegrations: [],
  areLoading: false,
  error: null
};

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getIntegrationsThunk.pending, (state) => {
      state.areLoading = true;
      state.listOfIntegrations = [];
      state.error = null;
    });
    builder.addCase(getIntegrationsThunk.fulfilled, (state, action) => {
      state.areLoading = false;
      state.listOfIntegrations.push(action.payload);
    });
    builder.addCase(getIntegrationsThunk.rejected, (state, action) => {
      state.areLoading = false;
      state.error = action.payload;
    });
  }
});

export default integrationsSlice.reducer;

export const integrationsSelector = (state) =>
  state.integrations.listOfIntegrations;
export const integrationsAreLoadingSelector = (state) =>
  state.integrations.areLoading;
export const integrationsHasErrorSelecor = (state) => state.integrations.error;
