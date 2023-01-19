import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testRailsCred: {
    email: '',
    host: '',
    key: '',
  },
  projectsForTestRailImport: [],
  currentScreen: 'configureTool',
  importSteps: [],
  selectedProjectsTestRailImport: [],
  testRailsConnectionEst: '',
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setTestRailsCred: (state, { payload }) => {
      state.testRailsCred[payload.key] = payload.value;
    },
    setProjectForTestRailsImport: (state, { payload }) => {
      state.projectsForTestRailImport = payload;
    },
    setCurrentScreen: (state, { payload }) => {
      state.currentScreen = payload;
    },
    setConfigureDataTestRails: (state, { payload }) => {
      state.selectedProjectsTestRailImport = payload;
    },
    setImportSteps: (state, { payload }) => {
      state.importSteps = payload;
    },
    setTestRailsConnectionState: (state, { payload }) => {
      state.testRailsConnectionEst = payload;
    },
  },
});

export const {
  setCurrentScreen,
  setConfigureDataTestRails,
  setTestRailsCred,
  setProjectForTestRailsImport,
  setImportSteps,
  setTestRailsConnectionState,
} = importSlice.actions;
export default importSlice.reducer;
