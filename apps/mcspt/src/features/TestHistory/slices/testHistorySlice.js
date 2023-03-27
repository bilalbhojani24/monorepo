import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestHistoryLoading: false,
  showHistoricalReportLoadingModal: false,
  previousUserSessions: []
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

// Action creators are generated for each case reducer function
export const {
  setPreviousUserSessions,
  setIsTestHistoryLoading,
  setShowHistoricalReportLoadingModal
} = testHistorySlice.actions;

export default testHistorySlice.reducer;
