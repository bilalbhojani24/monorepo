import { createSlice } from '@reduxjs/toolkit';

import { IMPORT_STATUS } from '../const/immutables';

const initialState = {
  isDetailsModalVisible: false,
  isReportModalVisible: false,
  isCancelModalVisible: false,
  isLoading: {},
  importDetails: {
    percent: 30,
    totalProjects: 12,
    successfullyImportedProjects: 6,
    failedProjects: 4,
    currentlyImportingProjectNo: 4,
    currentImportingProjectName: 'Hello',
    imported: 2,
    notImported: 2,
    totalImports: 40
  },
  importStatus: IMPORT_STATUS.ONGOING,
  isProgressDismissed: true,
  reportModalProjects: [],
  showNotification: false
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
      state.importDetails = payload;
    },
    setImportStatus: (state, { payload }) => {
      state.importStatus = payload;
    },
    setIsProgressDismissed: (state, { payload }) => {
      state.isProgressDismissed = payload;
    },
    setCancelModal: (state, { payload }) => {
      state.isCancelModalVisible = payload;
    },
    getQuickImportResultFulfilled: (state, { payload }) => {
      state.reportModalProjects = payload.projects;
    },
    setShowNotification: (state, { payload }) => {
      state.showNotification = payload;
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
  setIsProgressDismissed,
  setShowNotification,
  getQuickImportResultFulfilled
} = importProgressSlice.actions;

export default importProgressSlice.reducer;
