import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getJiraConfigStatus } from '../../../api/import.api';

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
  connectionStatusMap: { testrails: '', zephyr: '' },
  selectedRadioIdMap: {
    testrails: 'import-from-tool',
    zephyr: 'import-from-tool'
  },
  projectsForTestManagementImport: [],
  currentScreen: 'configureTool',
  importSteps: [],
  currentTestManagementTool: '',
  testRailsCredTouched: { email: false, host: false, key: false },
  zephyrCredTouched: {
    zephyr_key: false,
    email: false,
    jira_key: false,
    host: false
  },
  isJiraConfiguredForZephyr: false
};

export const setJiraConfigurationStatus = createAsyncThunk(
  'import/setJiraConfigurationStatus',
  async (payload) => {
    try {
      return await getJiraConfigStatus(payload);
    } catch (err) {
      return err;
    }
  }
);

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setTestRailsCred: (state, { payload }) => {
      state.testRailsCred[payload.key] = payload.value;
    },
    setTestRailsCredTouched: (state, { payload }) => {
      state.testRailsCredTouched[payload.key] = payload.value;
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
    },
    setZephyrCredTouched: (state, { payload }) => {
      state.zephyrCredTouched[payload.key] = payload.value;
    },
    importCleanUp: (state) => {
      state.testRailsCred = initialState.testRailsCred;
      state.zephyrCred = initialState.zephyrCred;
      state.connectionStatusMap = initialState.connectionStatusMap;
      state.selectedRadioIdMap = initialState.selectedRadioIdMap;
      state.projectsForTestManagementImport =
        initialState.projectsForTestManagementImport;
      state.currentScreen = initialState.currentScreen;
      state.importSteps = initialState.importSteps;
      state.currentTestManagementTool = initialState.currentTestManagementTool;
      state.testRailsCredTouched = initialState.testRailsCredTouched;
      state.zephyrCredTouched = initialState.zephyrCredTouched;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setJiraConfigurationStatus.fulfilled, (state, action) => {
      if (action.payload.code === 'ERR_BAD_REQUEST')
        state.isJiraConfiguredForZephyr = false;
      else {
        state.isJiraConfiguredForZephyr = true;
        // state.zephyrCred
      }
    });
    builder.addCase(setJiraConfigurationStatus.rejected, (state) => {
      state.isJiraConfiguredForZephyr = false;
    });
  }
});

export const {
  setCurrentTestManagementTool,
  setCurrentScreen,
  setTestRailsCred,
  setTestRailsCredTouched,
  setZephyrCred,
  setZephyrCredTouched,
  setProjectForTestManagementImport,
  setImportSteps,
  setImportStarted,
  // setLatestImportConfig,
  setCurrentImportStatus,
  setConnectionStatusMap,
  setSelectedRadioIdMap,
  importCleanUp
} = importSlice.actions;
export default importSlice.reducer;
