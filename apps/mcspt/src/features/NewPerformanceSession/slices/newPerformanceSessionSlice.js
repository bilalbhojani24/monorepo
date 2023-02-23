import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSetupStep: 1,
  selectedDevice: null,
  selectedApplication: null,
  listOfDevices: [],
  lisOfApplications: [],
  sessionDetails: {
    sessionName: ''
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

    setListOfDevices: (state, action) => {
      state.listOfDevices = action.payload;
    },

    setListOfApplications: (state, action) => {
      state.lisOfApplications = action.payload;
    },

    setSessionDetails: (state, action) => {
      state.sessionDetails = { ...state.sessionDetails, ...action.payload };
    },

    resetSessionSetupData: (state) => {
      state.currentSetupStep = 1;
      state.selectedDevice = null;
      state.selectedApplication = null;
      state.listOfDevices = [];
      state.lisOfApplications = [];
    }
  }
});

export const getCurrentSetupStep = (state) =>
  state.newPerformanceSession.currentSetupStep;

export const getSelectedDevice = (state) =>
  state.newPerformanceSession.selectedDevice;

export const getSelectedApplication = (state) =>
  state.newPerformanceSession.selectedApplication;

export const getListOfDevices = (state) =>
  state.newPerformanceSession.listOfDevices;

export const getListOfApplications = (state) =>
  state.newPerformanceSession.lisOfApplications;

export const getSessionDetails = (state) =>
  state.newPerformanceSession.sessionDetails;

// Action creators are generated for each case reducer function
export const {
  setCurrentSetupStep,
  setSelectedDevice,
  setSelectedApplication,
  setListOfDevices,
  setListOfApplications,
  setSessionDetails,
  resetSessionSetupData
} = newPerformanceSessionSlice.actions;

export default newPerformanceSessionSlice.reducer;
