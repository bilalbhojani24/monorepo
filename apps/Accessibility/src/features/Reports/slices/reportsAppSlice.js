import { createSlice } from '@reduxjs/toolkit';
import { versions } from 'constants';

const { actions, reducer } = createSlice({
  name: 'reportListing',
  initialState: {
    reportList: [],
    activeVersion: versions[0].value,
    lastIndex: 20
  },
  reducers: {
    setReportList: (state, { payload }) => {
      state.reportList = payload;
    },
    setIsReportSelected: (state, { payload }) => {
      const { id, isSelected } = payload;
      state.reportList.forEach((report) => {
        if (report.id === id) {
          report.isSelected = isSelected;
        }
      });
    },
    setActiveVersion: (state, { payload }) => {
      state.activeVersion = payload;
      state.reportList.forEach((report) => {
        report.isSelected = false;
      });
    },
    resetReportSelection: (state) => {
      state.reportList.forEach((report) => {
        report.isSelected = false;
      });
    },
    resetReportApp: (state) => {
      state.reportList = [];
      state.activeVersion = versions[0].value;
    },
    setLastIndex: (state, { payload }) => {
      state.lastIndex = payload;
    }
  }
});

export const {
  setReportList,
  setIsReportSelected,
  setActiveVersion,
  resetReportSelection,
  resetReportApp,
  setLastIndex
} = actions;

export default reducer;
