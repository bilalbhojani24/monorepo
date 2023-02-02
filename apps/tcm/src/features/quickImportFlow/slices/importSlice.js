import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  testRailsCred: {
    email: '',
    host: '',
    key: ''
  },
  zephyrCred: {
    zephyr_key: '',
    email: '',
    jira_key: '',
    host: ''
  },
  importStarted: false,
  currentImportStatus: '',
  // latestImportConfig: {},
  connectionStatusMap: { testrails: '', zephyr: '' },
  selectedRadioIdMap: { testrails: '', zephyr: '' },
  projectsForTestManagementImport: [],
  currentScreen: 'configureTool',
  importSteps: [],
  currentTestManagementTool: ''
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
    setImportStarted: (state, { payload }) => {
      state.importStarted = payload;
    },
    setCurrentImportStatus: (state, { payload }) => {
      state.currentImportStatus = payload;
    },
    // setLatestImportConfig: (state, { payload }) => {
    //   state.latestImportConfig = payload;
    // },
    setConnectionStatusMap: (state, { payload }) => {
      state.connectionStatusMap[payload.key] = payload.value;
      if (payload.key === 'testrails') {
        state.zephyrCred = initialState.zephyrCred;
        state.connectionStatusMap.zephyr = '';
        state.selectedRadioIdMap.zephyr = '';
      } else if (payload.key === 'zephyr') {
        state.testRailsCred = initialState.testRailsCred;
        state.connectionStatusMap.testrails = '';
        state.selectedRadioIdMap.testrails = '';
      }
    },
    setSelectedRadioIdMap: (state, { payload }) => {
      state.selectedRadioIdMap[payload.key] = payload.value;
    },
    setCurrentTestManagementTool: (state, { payload }) => {
      state.currentTestManagementTool = payload;
    },
    setZephyrCred: (state, { payload }) => {
      state.zephyrCred[payload.key] = payload.value;
    }
  }
});

export const {
  setCurrentTestManagementTool,
  setCurrentScreen,
  setTestRailsCred,
  setZephyrCred,
  setProjectForTestManagementImport,
  setImportSteps,
  setImportStarted,
  // setLatestImportConfig,
  setCurrentImportStatus,
  setConnectionStatusMap,
  setSelectedRadioIdMap
} = importSlice.actions;
export default importSlice.reducer;
