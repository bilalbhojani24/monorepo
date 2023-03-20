import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areDevicesStillLoading: true,
  areApplicationsStillLoading: true,
  isSessionApiLoading: false,
  errorOnApplicationFetch: null
};

export const loadingStateForNewPerformanceSession = createSlice({
  name: 'loadingStateForNewPerformanceSession',
  initialState,
  reducers: {
    setAreDevicesStillLoading: (state, action) => {
      state.areDevicesStillLoading = action.payload;
    },

    setAreApplicationsStillLoading: (state, action) => {
      state.areApplicationsStillLoading = action.payload;
    },

    setIsSessionApiLoading: (state, action) => {
      state.isSessionApiLoading = action.payload;
    },

    setErrorOnApplicationFetch: (state, action) => {
      state.errorOnApplicationFetch = action.payload;
    }
  }
});

export const getAreDevicesStillLoading = (state) =>
  state.loadingStateForNewPerformanceSession.areDevicesStillLoading;

export const getAreApplicationsStillLoading = (state) =>
  state.loadingStateForNewPerformanceSession.areApplicationsStillLoading;

export const getIsSessionApiLoading = (state) =>
  state.loadingStateForNewPerformanceSession.isSessionApiLoading;

export const getDependencyErrorExists = (state) =>
  state.loadingStateForNewPerformanceSession.dependencyErrorExists;

export const getErrorOnApplicationFetch = (state) =>
  state.loadingStateForNewPerformanceSession.errorOnApplicationFetch;

// Action creators are generated for each case reducer function
export const {
  setAreDevicesStillLoading,
  setAreApplicationsStillLoading,
  setIsSessionApiLoading,
  setDependencyErrorExists,
  setErrorOnApplicationFetch
} = loadingStateForNewPerformanceSession.actions;

export default loadingStateForNewPerformanceSession.reducer;
