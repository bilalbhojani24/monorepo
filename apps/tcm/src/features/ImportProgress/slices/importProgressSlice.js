import { createSlice } from '@reduxjs/toolkit';

import { IMPORT_STATUS } from '../const/immutables';

const initialState = {
  isDetailsModalVisible: false,
  isReportModalVisible: false,
  isCancelModalVisible: false,
  loader: { alert: false },
  importDetails: {
    percent: 0,
    totalProjects: 'N',
    successfullyImportedProjects: 0,
    failedProjects: 0,
    currentProjectNumber: 0,
    currentProjectName: '--'
  },
  importStatus: IMPORT_STATUS.ONGOING,
  isProgressDismissed: true,
  isNotificationDismissed: true,
  isTooltipDismissed: false,
  reportModalProjects: [],
  progressNotification: { show: null, id: 'progress-notification' }
};

export const importProgressSlice = createSlice({
  name: 'importProgress',
  initialState,
  reducers: {
    setDetailsModal: (state, { payload }) => {
      state.isDetailsModalVisible = payload;
    },
    setReportModal: (state, { payload }) => {
      state.isReportModalVisible = payload;
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    setImportDetails: (state, { payload }) => {
      if (payload) {
        state.importDetails.percent = payload?.percent;
        state.importDetails.totalProjects = payload?.projects;
        state.importDetails.currentProjectName = payload?.current_project;
        state.importDetails.currentProjectNumber =
          payload?.current_project_number;
        state.importDetails.failedProjects = payload?.projects_failed;
        state.importDetails.successfullyImportedProjects =
          payload?.projects_done;
      }
    },
    setImportStatus: (state, { payload }) => {
      state.importStatus = payload;
    },
    setIsProgressDismissed: (state, { payload }) => {
      state.isProgressDismissed = payload;
    },
    setNotificationDismissed: (state, { payload }) => {
      state.isNotificationDismissed = payload;
    },
    setTooltipDismissed: (state, { payload }) => {
      state.isTooltipDismissed = payload;
    },
    setCancelModal: (state, { payload }) => {
      state.isCancelModalVisible = payload;
    },
    getQuickImportResultFulfilled: (state, { payload }) => {
      state.reportModalProjects = payload.projects;
    },
    setNotificationConfig: (state, { payload }) => {
      state.progressNotification.show = payload?.show;
      state.progressNotification.id =
        payload?.id || initialState.progressNotification.id;
    },
    showAlertLoader: (state, { payload }) => {
      state.loader.alert = payload;
    }
  }
});

export const {
  setReportModal,
  setImportStatus,
  setImportDetails,
  setIsLoadingProps,
  setDetailsModal,
  setCancelModal,
  showAlertLoader,
  setTooltipDismissed,
  setNotificationDismissed,
  setIsProgressDismissed,
  setNotificationConfig,
  getQuickImportResultFulfilled
} = importProgressSlice.actions;

export default importProgressSlice.reducer;
