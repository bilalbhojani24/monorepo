import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testRailsCred: {
    email: '',
    host: '',
    key: '',
  },
  projectsForTestRailImport: [],
  currentScreen: 'configureTool',
  selectedProjectsTestRailImport: [],
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
  },
});

export const {
  setCurrentScreen,
  setConfigureDataTestRails,
  setTestRailsCred,
  setProjectForTestRailsImport,
} = importSlice.actions;
export default importSlice.reducer;
