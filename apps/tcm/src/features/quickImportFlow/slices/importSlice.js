import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  dismissNotificationForImport,
  getJiraConfigStatus,
  getLatestQuickImportConfig,
  getQuickImportStatus,
  retryImport
} from '../../../api/import.api';
import {
  COMPLETED,
  FAILURE_DATA,
  ONGOING,
  SUCCESS_DATA,
  WARNING_DATA
} from '../const/importConst';
import { IMPORT_STEPS } from '../const/importSteps';

const initialState = {
  configureToolTestConnectionLoading: false,
  configureToolProceedLoading: false,
  configureToolProceed: false,
  showErrorForConfigData: false,
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
  connectionStatusMap: { testrails: '', zephyr: '' },
  selectedRadioIdMap: {
    testrails: 'import-from-tool',
    zephyr: 'import-from-tool'
  },
  projectsForTestManagementImport: [],
  currentScreen: 'configureTool',
  importSteps: IMPORT_STEPS,
  currentTestManagementTool: '',
  testRailsCredTouched: { email: false, host: false, key: false },
  zephyrCredTouched: {
    zephyr_key: false,
    email: false,
    jira_key: false,
    host: false
  },
  isJiraConfiguredForZephyr: false,
  importId: null,
  importStatus: COMPLETED,
  isDismissed: true,
  notificationData: null,
  notificationProjectConfig: { projects: [], totalCount: 0, successCount: 0 },
  showNotificationModal: false,
  checkImportStatusClicked: false,
  quickImportProjectId: null,
  beginImportLoading: false,
  configureToolPageLoading: true
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

export const setImportConfigurations = createAsyncThunk(
  'import/setImportConfigurations',
  async () => {
    try {
      return await getLatestQuickImportConfig();
    } catch (err) {
      return err;
    }
  }
);

export const setQuickImportStatus = createAsyncThunk(
  'import/getQuickImportStatus',
  async (id) => {
    try {
      return await getQuickImportStatus(id);
    } catch (err) {
      return err;
    }
  }
);
export const setRetryImport = createAsyncThunk(
  'import/retryImport',
  async ({ id, testTool }) => {
    try {
      const response = await retryImport(id, testTool);
      return { ...response, testTool };
    } catch (err) {
      return err;
    }
  }
);

export const setNotificationDismissed = createAsyncThunk(
  'import/setNotificationDismissed',
  async (id) => {
    try {
      return await dismissNotificationForImport(id);
    } catch (err) {
      return err;
    }
  }
);

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setConfigureToolProceedLoading: (state, { payload }) => {
      state.configureToolProceedLoading = payload;
    },
    setConfigureToolPageLoading: (state, { payload }) => {
      state.configureToolPageLoading = payload;
    },
    setConfigureToolTestConnectionLoading: (state, { payload }) => {
      state.configureToolTestConnectionLoading = payload;
    },
    setErrorForConfigureData: (state, { payload }) => {
      state.showErrorForConfigData = payload;
    },
    setConfigureToolProceeded: (state, { payload }) => {
      state.configureToolProceed = payload;
    },
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
    setConnectionStatusMap: (state, { payload }) => {
      state.connectionStatusMap[payload.key] = payload.value;
      if (payload.key === 'testrails') {
        state.connectionStatusMap.zephyr = '';
      } else if (payload.key === 'zephyr') {
        state.connectionStatusMap.testrails = '';
      }
    },
    setImportStatus: (state, { payload }) => {
      state.importStatus = payload;
    },
    setNotificationData: (state, { payload }) => {
      state.notificationData = payload;
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
    quickImportCleanUp: (state, { payload }) => {
      const {
        importId,
        importStatus,
        isDismissed,
        importStarted,
        notificationData,
        notificationProjectConfig,
        showNotificationModal,
        checkImportStatusClicked,
        quickImportProjectId,
        currentTestManagementTool,
        ...restInitialState
      } = initialState;

      return {
        importId: payload?.importId,
        importStatus: payload?.importStatus,
        isDismissed: payload?.isDismissed,
        importStarted: payload?.importStarted,
        notificationData: payload?.notificationData,
        notificationProjectConfig: payload?.notificationProjectConfig,
        showNotificationModal: payload?.showNotificationModal,
        checkImportStatusClicked: payload?.checkImportStatusClicked,
        quickImportProjectId: payload?.quickImportProjectId,
        currentTestManagementTool: payload?.currentTestManagementTool,
        ...restInitialState
      };
    },
    setCheckImportStatusClicked: (state, { payload }) => {
      state.checkImportStatusClicked = payload;
    },
    setNotificationProjectConfig: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.notificationProjectConfig[key] = payload[key];
      });
    },
    setShowNotificationModal: (state, { payload }) => {
      state.showNotificationModal = payload;
    },
    setProjectIdForQuickImport: (state, { payload }) => {
      state.quickImportProjectId = payload;
    },
    setImportStatusOngoing: (state) => {
      state.importStatus = ONGOING;
      state.notificationData = WARNING_DATA;
    },
    setBeginImportLoading: (state, { payload }) => {
      state.beginImportLoading = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setJiraConfigurationStatus.fulfilled, (state, action) => {
      if (action.payload.code === 'ERR_BAD_REQUEST')
        state.isJiraConfiguredForZephyr = false;
      else {
        state.isJiraConfiguredForZephyr = true;
        state.zephyrCred.email = action.payload.data.email;
        state.zephyrCred.host = action.payload.data.host;
        state.zephyrCred.jira_key = action.payload.data.key;
      }
    });
    builder.addCase(setJiraConfigurationStatus.rejected, (state) => {
      state.isJiraConfiguredForZephyr = false;
    });
    builder.addCase(setImportConfigurations.fulfilled, (state, { payload }) => {
      state.importId = payload.import_id;
      state.importStatus = payload.status;
      state.isDismissed = payload.is_dismissed;
      // state.currentTestManagementTool =
      //   payload.import_type.split('_')[0] === 'testrail'
      //     ? `${payload.import_type.split('_')[0]}s`
      //     : payload.import_type.split('_')[0];
    });
    builder.addCase(setQuickImportStatus.fulfilled, (state, { payload }) => {
      if (payload.status === ONGOING) {
        state.importStatus = ONGOING;
        state.notificationData = WARNING_DATA;
      } else if (payload.status === COMPLETED) {
        if (payload.success_count < payload.total) {
          state.notificationData = FAILURE_DATA;
        } else {
          state.notificationData = SUCCESS_DATA;
        }
        state.notificationProjectConfig.projects = payload.projects;
        state.notificationProjectConfig.totalCount = payload.total;
        state.notificationProjectConfig.successCount = payload.success_count;
        state.importStatus = COMPLETED;
        state.currentTestManagementTool =
          payload.import_type.split('_')[0] === 'testrail'
            ? `${payload.import_type.split('_')[0]}s`
            : payload.import_type.split('_')[0];
      }
    });
    builder.addCase(setRetryImport.fulfilled, (state, { payload }) => {
      if (payload.testTool === 'testrail') {
        state.testRailsCred.email = payload.credentials.email;
        state.testRailsCred.host = payload.credentials.host;
        state.testRailsCred.key = payload.credentials.key;
      } else if (payload.testTool === 'zephyr') {
        state.zephyrCred.email = payload.credentials.email;
        state.zephyrCred.host = payload.credentials.host;
        state.zephyrCred.jira_key = payload.credentials.jira_key;
        state.zephyrCred.zephyr_key = payload.credentials.zephyr_key;
      }
      state.configureToolPageLoading = false;
    });
    builder.addCase(setNotificationDismissed.fulfilled, (state) => {
      state.isDismissed = true;
    });
  }
});

export const {
  setConfigureToolProceedLoading,
  setConfigureToolTestConnectionLoading,
  setConfigureToolProceeded,
  setCurrentTestManagementTool,
  setCurrentScreen,
  setErrorForConfigureData,
  setTestRailsCred,
  setTestRailsCredTouched,
  setZephyrCred,
  setZephyrCredTouched,
  setProjectForTestManagementImport,
  setImportSteps,
  setImportStarted,
  setConnectionStatusMap,
  setSelectedRadioIdMap,
  quickImportCleanUp,
  setImportConfig,
  setImportStatus,
  setNotificationData,
  setCheckImportStatusClicked,
  setImportedProjects,
  setNotificationProjectConfig,
  setShowNotificationModal,
  setProjectIdForQuickImport,
  setImportStatusOngoing,
  setBeginImportLoading,
  setConfigureToolPageLoading
} = importSlice.actions;
export default importSlice.reducer;
