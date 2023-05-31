import { createSlice } from '@reduxjs/toolkit';
import { getConfigurationsThunk } from 'api/configurations';
import { LOADING_STATUS } from 'constants/loadingConstants';

const initialState = {
  configurations: [],
  activeConfigurations: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    setActiveConfigurations: (state, action) => {
      state.activeConfigurations = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getConfigurationsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getConfigurationsThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      const { configurations } = action.payload || {};
      if (Array.isArray(configurations)) {
        state.configurations = configurations.map(({ key: value, label }) => ({
          value,
          label
        }));
      }
    });
    builder.addCase(getConfigurationsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action.error;
    });
  }
});

export const { setActiveConfigurations } = configurationsSlice.actions;

export default configurationsSlice.reducer;

export const activeConfigurationsSelector = (state) =>
  state.configurations.activeConfigurations;
export const configurationsLoadingSelector = (state) =>
  state.configurations.loading;
export const configurationsErrorSelector = (state) =>
  state.configurations.error;
export const configurationsSelector = (state) =>
  state.configurations.configurations;
