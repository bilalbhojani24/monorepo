import { createSlice } from '@reduxjs/toolkit';

import { getIntegrationsThunk } from '../../api/index';

import { LOADING_STATUS } from './constants';

const initialState = {
  listOfIntegrations: [],
  loading: LOADING_STATUS.IDLE,
  error: null,
  hasIntegrated: false,
  activeIntegration: {}
};

export const integrationsSlice = createSlice({
  name: 'integrations',
  initialState,
  reducers: {
    setHasIntegrated: (state, action) => {
      const targetIdx = state.listOfIntegrations.findIndex(
        (integration) => integration.key === action.payload
      );
      state.listOfIntegrations[targetIdx].setup_completed = true;
      state.hasIntegrated = true;
    },
    setActiveIntegration: (state, action) => {
      state.activeIntegration = action.payload;
    }
  },
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
      state.error = action.error;
    });
  }
});
export const { setHasIntegrated, setActiveIntegration } =
  integrationsSlice.actions;
export default integrationsSlice.reducer;

export const integrationsSelector = (state) =>
  state.integrations.listOfIntegrations;
export const integrationsLoadingSelector = (state) =>
  state.integrations.loading;
export const integrationsErrorSelector = (state) => state.integrations.error;
export const hasIntegratedSelector = (state) =>
  state.integrations.hasIntegrated;
