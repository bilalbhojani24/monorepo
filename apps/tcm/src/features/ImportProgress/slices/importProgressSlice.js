import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDetailsModalVisible: false,
  isReportModalVisible: false,
  isLoading: {},
  importDetails: {
    overallProgress: 30,
    imported: 2,
    notImported: 2,
    totalImports: 40,
    timeRemaining: 'About 6 min'
  },
  importStatus: 'failure',
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
    }
  }
});

export const {
  setReportModal,
  setImportStatus,
  setImportDetails,
  setIsLoadingProps,
  setDetailsModal,
  setIsProgressDismissed
} = importProgressSlice.actions;

export default importProgressSlice.reducer;
