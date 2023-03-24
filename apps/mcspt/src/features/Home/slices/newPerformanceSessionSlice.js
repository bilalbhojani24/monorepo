import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSetupStep: 1,
  selectedDevice: {},
  selectedApplication: {},
  listOfDevices: [],
  lisOfApplications: [],
  startTestError: null,
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

    setStartTestError: (state, action) => {
      state.startTestError = action.payload;
    },

    resetSessionSetupData: (state) => {
      state.currentSetupStep = initialState.currentSetupStep;
      state.selectedDevice = initialState.selectedDevice;
      state.selectedApplication = initialState.selectedApplication;
      state.listOfDevices = initialState.listOfDevices;
      state.lisOfApplications = initialState.lisOfApplications;
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

export const getStartTestError = (state) =>
  state.newPerformanceSession.startTestError;

export const getSessionDetails = (state) =>
  state.newPerformanceSession.sessionDetails;

// Action creators are generated for each case reducer function
export const {
  setCurrentSetupStep,
  setSelectedDevice,
  setSelectedApplication,
  setListOfDevices,
  setListOfApplications,
  setStartTestError,
  setSessionDetails,
  resetSessionSetupData
} = newPerformanceSessionSlice.actions;

export default newPerformanceSessionSlice.reducer;
