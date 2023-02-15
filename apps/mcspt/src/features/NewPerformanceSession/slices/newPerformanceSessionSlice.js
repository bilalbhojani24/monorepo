import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSetupStep: 1,
  selectedDevice: null,
  selectedApplication: null,
  areDevicesStillLoading: true,
  listOfDevices: [],
  areApplicationsStillLoading: true,
  lisOfApplications: [],
  sessionDetails: {
    // 6b237dd8-74d5-4588-ac64-956f5078ab71
  }
};

export const newPerformanceSessionSlice = createSlice({
  name: 'newPerformanceSession',
  initialState,
  reducers: {
    setCurrentSetupStep: (state, action) => {
      state.currentSetupStep = action.payload;
    },

    setSelectedDevice: (state, action) => {
      state.selectedDevice = action.payload;
    },

    setSelectedApplication: (state, action) => {
      state.selectedApplication = action.payload;
    },

    setAreDevicesStillLoading: (state, action) => {
      state.areDevicesStillLoading = action.payload;
    },

    setListOfDevices: (state, action) => {
      state.listOfDevices = action.payload;
    },

    setAreApplicationsStillLoading: (state, action) => {
      state.areApplicationsStillLoading = action.payload;
    },

    setListOfApplications: (state, action) => {
      state.lisOfApplications = action.payload;
    },

    setSessionDetails: (state, action) => {
      state.sessionDetails = action.payload;
    }
  }
});

export const getCurrentSetupStep = (state) =>
  state.newPerformanceSession.currentSetupStep;

export const getSelectedDevice = (state) =>
  state.newPerformanceSession.selectedDevice;

export const getSelectedApplication = (state) =>
  state.newPerformanceSession.selectedApplication;

export const getAreDevicesStillLoading = (state) =>
  state.newPerformanceSession.areDevicesStillLoading;

export const getListOfDevices = (state) =>
  state.newPerformanceSession.listOfDevices;

export const getAreApplicationsStillLoading = (state) =>
  state.newPerformanceSession.areApplicationsStillLoading;

export const getListOfApplications = (state) =>
  state.newPerformanceSession.lisOfApplications;

export const getSessionDetails = (state) =>
  state.newPerformanceSession.sessionDetails;

// Action creators are generated for each case reducer function
export const {
  setCurrentSetupStep,
  setSelectedDevice,
  setSelectedApplication,
  setAreDevicesStillLoading,
  setListOfDevices,
  setAreApplicationsStillLoading,
  setListOfApplications,
  setSessionDetails
} = newPerformanceSessionSlice.actions;

export default newPerformanceSessionSlice.reducer;
