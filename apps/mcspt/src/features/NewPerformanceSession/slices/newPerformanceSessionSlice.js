import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSetupStep: 1,
  selectedDevice: null,
  selectedApplication: null
};

export const newPerformnceSessionSlice = createSlice({
  name: 'newPerformnceSession',
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
    }
  }
});

export const getCurrentSetupStep = (state) =>
  state.newPerformnceSession.currentSetupStep;
export const getSelectedDevice = (state) =>
  state.newPerformnceSession.selectedDevice;
export const getSelectedApplication = (state) =>
  state.newPerformnceSession.selectedApplication;

// Action creators are generated for each case reducer function
export const {
  setCurrentSetupStep,
  setSelectedDevice,
  setSelectedApplication
} = newPerformnceSessionSlice.actions;

export default newPerformnceSessionSlice.reducer;
