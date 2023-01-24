import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testRailsCred: {
    email: '',
    host: '',
    key: '',
  },
  zephyrCred: {
    zephyr_key: '',
    email: '',
    jira_key: '',
    host: '',
  },
  projectsForTestManagementImport: [],
  currentScreen: 'configureTool',
  importSteps: [],
  connectionEst: '',
  currentTestManagementTool: '',
  selectedRadioId: '',
};

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setTestRailsCred: (state, { payload }) => {
      state.testRailsCred[payload.key] = payload.value;
    },
    setProjectForTestManagementImport: (state, { payload }) => {
      state.projectsForTestManagementImport = payload;
    },
    setCurrentScreen: (state, { payload }) => {
      state.currentScreen = payload;
    },
    setImportSteps: (state, { payload }) => {
      state.importSteps = payload;
    },
    setConnectionState: (state, { payload }) => {
      state.connectionEst = payload;
    },
    setSelectedRadioId: (state, { payload }) => {
      state.selectedRadioId = payload;
    },
    setCurrentTestManagementTool: (state, { payload }) => {
      state.currentTestManagementTool = payload;
    },
    setZephyrCred: (state, { payload }) => {
      state.zephyrCred[payload.key] = payload.value;
    },
  },
});

export const {
  setCurrentTestManagementTool,
  setCurrentScreen,
  setTestRailsCred,
  setZephyrCred,
  setProjectForTestManagementImport,
  setImportSteps,
  setConnectionState,
  setSelectedRadioId,
} = importSlice.actions;
export default importSlice.reducer;
