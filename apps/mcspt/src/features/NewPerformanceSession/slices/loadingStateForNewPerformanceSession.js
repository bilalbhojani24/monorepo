import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  areDevicesStillLoading: true,
  areApplicationsStillLoading: true,
  isSessionApiLoading: false
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
    }
  }
});

export const getAreDevicesStillLoading = (state) =>
  state.loadingStateForNewPerformanceSession.areDevicesStillLoading;

export const getAreApplicationsStillLoading = (state) =>
  state.loadingStateForNewPerformanceSession.areApplicationsStillLoading;

export const getIsSessionApiLoading = (state) =>
  state.loadingStateForNewPerformanceSession.isSessionApiLoading;

// Action creators are generated for each case reducer function
export const {
  areDevicesStillLoading,
  areApplicationsStillLoading,
  isSessionApiLoading,
  setAreDevicesStillLoading,
  setAreApplicationsStillLoading,
  setIsSessionApiLoading,
  setIsSessionStopApiLoading
} = loadingStateForNewPerformanceSession.actions;

export default loadingStateForNewPerformanceSession.reducer;
