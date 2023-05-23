import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  // dismissNotificationForImport,
  getJiraConfigStatus,
  getLatestQuickImportConfig
} from '../../../api/import.api';
import { SCREEN_1, SCREEN_2, TESTRAIL, ZEPHYR } from '../const/importSteps';

const initialState = {
  loader: {
    configureToolTestConnectionLoading: false,
    configureToolProceedLoading: false,
    beginImportLoading: false,
    configureToolPageLoading: true
  },
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
  importStarted: null,
  connectionStatusMap: { testrail: '', zephyr: '' },
  selectedRadioIdMap: {
    testrail: 'import-from-tool',
    zephyr: 'import-from-tool'
  },
  projectsForTestManagementImport: [],
  currentScreen: SCREEN_1,
  currentTestManagementTool: '',
  isJiraConfiguredForZephyr: false,
  importId: null,
  importIdBeforeImport: null,
  quickImportProjectId: null,
  topImportInfoSteps: [],
  loggedInScreen: false,
  loggedInForTool: '',
  showArtificialLoader: false
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

// export const setNotificationDismissed = createAsyncThunk(
//   'import/setNotificationDismissed',
//   async (id) => {
//     try {
//       return await dismissNotificationForImport(id);
//     } catch (err) {
//       return err;
//     }
//   }
// );

const importSlice = createSlice({
  name: 'import',
  initialState,
  reducers: {
    setConfigureToolProceedLoading: (state, { payload }) => {
      state.loader.configureToolProceedLoading = payload;
    },
    setConfigureToolPageLoading: (state, { payload }) => {
      state.loader.configureToolPageLoading = payload;
    },
    setConfigureToolTestConnectionLoading: (state, { payload }) => {
      state.loader.configureToolTestConnectionLoading = payload;
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
    setProjectForTestManagementImport: (state, { payload }) => {
      state.projectsForTestManagementImport = payload;
    },
    setCurrentScreen: (state, { payload }) => {
      if (payload === SCREEN_2)
        state.topImportInfoSteps = [
          {
            title: `Successfully connected to ${
              state.currentTestManagementTool === ZEPHYR
                ? 'Zephyr Scale'
                : 'Testrails'
            }`,
            description: `Connected with: '${
              state.currentTestManagementTool === ZEPHYR
                ? state.zephyrCred.email
                : state.testRailsCred.email
            }'`,
            ctaText: 'Edit Connection',
            redirectTo: SCREEN_1
          }
        ];
      state.currentScreen = payload;
    },
    setImportStarted: (state, { payload }) => {
      state.importStarted = payload;
    },
    setConnectionStatusMap: (state, { payload }) => {
      state.connectionStatusMap[payload.key] = payload.value;
      if (payload.key === TESTRAIL) {
        state.connectionStatusMap.zephyr = '';
      } else if (payload.key === ZEPHYR) {
        state.connectionStatusMap.testrail = '';
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
    setTestConnectionFulfilled: (state) => {
      state.connectionStatusMap[state.currentTestManagementTool] = 'success';
      state.loader.configureToolTestConnectionLoading = false;
    },
    setTestConnectionFailed: (state) => {
      state.connectionStatusMap[state.currentTestManagementTool] = 'error';
      state.loader.configureToolTestConnectionLoading = false;
    },
    setProceedFulfilled: (state, { payload }) => {
      if (payload?.import_id) state.importIdBeforeImport = payload?.import_id;
      state.projectsForTestManagementImport = payload.projects.map(
        (project) => ({
          ...project,
          checked: true
        })
      );
      state.configureToolProceed = true;
      state.loader.configureToolProceedLoading = false;
    },
    setProceedFailed: (state) => {
      state.loader.configureToolProceedLoading = false;
    },
    quickImportCleanUp: (state, { payload }) => {
      const {
        importId,
        // importStatus,
        // isDismissed,
        importStarted,
        // notificationData,
        // notificationProjectConfig,
        // showNotificationModal,
        // checkImportStatusClicked,
        quickImportProjectId,
        currentTestManagementTool,
        successfulImportedProjects,
        ...restInitialState
      } = initialState;

      return {
        importId: payload?.importId,
        // importStatus: payload?.importStatus,
        isDismissed: payload?.isDismissed,
        importStarted: payload?.importStarted,
        // notificationData: payload?.notificationData,
        // notificationProjectConfig: payload?.notificationProjectConfig,
        // showNotificationModal: payload?.showNotificationModal,
        // checkImportStatusClicked: payload?.checkImportStatusClicked,
        quickImportProjectId: payload?.quickImportProjectId,
        currentTestManagementTool: payload?.currentTestManagementTool,
        successfulImportedProjects: payload?.successfulImportedProjects,
        ...restInitialState
      };
    },
    // setCheckImportStatusClicked: (state, { payload }) => {
    //   state.checkImportStatusClicked = payload;
    // },
    setNotificationProjectConfig: (state, { payload }) => {
      Object.keys(payload).forEach((key) => {
        state.notificationProjectConfig[key] = payload[key];
        if (key === 'successCount')
          state.successfulImportedProjects = payload[key];
      });
    },
    setShowNotificationModal: (state, { payload }) => {
      state.showNotificationModal = payload;
    },
    setProjectIdForQuickImport: (state, { payload }) => {
      state.quickImportProjectId = payload;
    },
    setBeginImportLoading: (state, { payload }) => {
      state.loader.beginImportLoading = payload;
    },
    setLatestImportTool: (state, { payload }) => {
      state.latestImportTool = payload;
    },
    setNewProjectBannerDismiss: (state, { payload }) => {
      state.isNewProjectBannerDismissed = payload;
    },
    setShowNewProjectBanner: (state, { payload }) => {
      state.showNewProjectBanner = payload;
    },
    setImportedProjectCount: (state, { payload }) => {
      state.successfulImportedProjects = payload;
    },
    setShowLoggedInScreen: (state, { payload }) => {
      state.loggedInScreen = payload;
      state.loggedInForTool = state.currentTestManagementTool;
    },
    setShowArtificialLoader: (state, { payload }) => {
      state.showArtificialLoader = payload;
    },
    setImportId: (state, { payload }) => {
      state.importId = payload;
    },
    setImportIdBeforeImport: (state, { payload }) => {
      state.importIdBeforeImport = payload;
    },
    retryQuickImportFulfilled: (state, { payload }) => {
      if (!payload.justFetchCreds) state.loggedInScreen = true;

      const testTool = state.currentTestManagementTool;
      if (testTool === TESTRAIL) {
        state.testRailsCred.email = payload.credentials.email;
        state.testRailsCred.host = payload.credentials.host;
        state.testRailsCred.key = payload.credentials.key;
      } else if (testTool === ZEPHYR) {
        state.zephyrCred.email = payload.credentials.email;
        state.zephyrCred.host = payload.credentials.host;
        state.zephyrCred.jira_key = payload.credentials.jira_key;
        state.zephyrCred.zephyr_key = payload.credentials.zephyr_key;
      }
      state.currentScreen = SCREEN_1;
      state.loggedInForTool = testTool;
      state.loader.configureToolPageLoading = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setJiraConfigurationStatus.fulfilled, (state, action) => {
      if (!action.payload.success) state.isJiraConfiguredForZephyr = false;
      if (action.payload.success && state.latestImportTool !== ZEPHYR) {
        state.isJiraConfiguredForZephyr = true;
        state.zephyrCred.email = action.payload.data.email;
        state.zephyrCred.host = action.payload.data.host;
      }
      if (state.latestImportTool === ZEPHYR && action.payload.success) {
        state.isJiraConfiguredForZephyr = true;
      }
    });
    builder.addCase(setImportConfigurations.fulfilled, (state, { payload }) => {
      state.importId = payload.import_id;
      // state.importStatus = payload.status;
      // state.isDismissed = payload.is_dismissed;
      // state.isNewProjectBannerDismissed = payload.new_projects_banner_dismissed;
    });
    // builder.addCase(setNotificationDismissed.fulfilled, (state) => {
    //   state.isDismissed = true;
    // });
  }
});

export const {
  setConfigureToolProceedLoading,
  setConfigureToolTestConnectionLoading,
  setConfigureToolProceeded,
  setCurrentTestManagementTool,
  setCurrentScreen,
  setImportId,
  setImportIdBeforeImport,
  setErrorForConfigureData,
  setTestRailsCred,
  setZephyrCred,
  setProjectForTestManagementImport,
  setImportStarted,
  setConnectionStatusMap,
  setSelectedRadioIdMap,
  quickImportCleanUp,
  setImportConfig,
  setImportedProjects,
  setNotificationProjectConfig,
  setProjectIdForQuickImport,
  setBeginImportLoading,
  setConfigureToolPageLoading,
  setLatestImportTool,
  setShowNewProjectBanner,
  setImportedProjectCount,
  setShowLoggedInScreen,
  setShowArtificialLoader,
  setTestConnectionFulfilled,
  setTestConnectionFailed,
  setProceedFailed,
  setProceedFulfilled,
  retryQuickImportFulfilled
} = importSlice.actions;
export default importSlice.reducer;
