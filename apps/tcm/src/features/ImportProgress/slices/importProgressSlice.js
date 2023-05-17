import { createSlice } from '@reduxjs/toolkit';

import { IMPORT_STATUS } from '../const/immutables';

const initialState = {
  isDetailsModalVisible: false,
  isReportModalVisible: false,
  isCancelModalVisible: false,
  isLoading: {},
  importDetails: {
    overallProgress: 30,
    imported: 2,
    notImported: 2,
    totalImports: 40
    // timeRemaining: 'About 6 min'
  },
  importStatus: IMPORT_STATUS.ONGOING,
  isProgressDismissed: true
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
  setIsProgressDismissed
} = importProgressSlice.actions;

export default importProgressSlice.reducer;
