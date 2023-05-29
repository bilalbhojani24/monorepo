import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestHistoryLoading: false,
  showHistoricalReportLoadingModal: false,
  previousUserSessions: [],
  areSampleReportsLoading: false,
  sampleReports: []
};

export const testHistorySlice = createSlice({
  name: 'testHistory',
  initialState,
  reducers: {
    setPreviousUserSessions: (state, action) => {
      state.previousUserSessions = action.payload;
    },
    setIsTestHistoryLoading: (state, action) => {
      state.isTestHistoryLoading = action.payload;
    },
    setShowHistoricalReportLoadingModal: (state, action) => {
      state.showHistoricalReportLoadingModal = action.payload;
    },
    setSampleReports: (state, action) => {
      state.sampleReports = action.payload;
    },
    setAreSampleReportsLoading: (state, action) => {
      state.areSampleReportsLoading = action.payload;
    }
  }
});

// reducers
export const getPreviousUserSessions = (state) =>
  state.testHistory.previousUserSessions;

export const getIsTestHistoryLoading = (state) =>
  state.testHistory.isTestHistoryLoading;

export const getShowHistoricalReportLoadingModal = (state) =>
  state.testHistory.showHistoricalReportLoadingModal;

export const getSampleReports = (state) => state.testHistory.sampleReports;

export const getAreSampleReportsLoading = (state) =>
  state.testHistory.areSampleReportsLoading;

// Action creators are generated for each case reducer function
export const {
  setPreviousUserSessions,
  setIsTestHistoryLoading,
  setShowHistoricalReportLoadingModal,
  setSampleReports,
  setAreSampleReportsLoading
} = testHistorySlice.actions;

export default testHistorySlice.reducer;
