import { getStorage } from '@browserstack/utils';
import { createSlice } from '@reduxjs/toolkit';
import { reportPerPage, versions } from 'constants';

const { actions, reducer } = createSlice({
  name: 'reportListing',
  initialState: {
    reportList: [],
    activeVersion: versions[0].value,
    selectedReportType: [],
    lastIndex: reportPerPage,
    isShowingBanner: !getStorage('showed-extension-banner')
  },
  reducers: {
    setReportList: (state, { payload }) => {
      state.reportList = payload;
    },
    setIsReportSelected: (state, { payload }) => {
      const { id, isSelected } = payload;
      state.reportList.forEach((report) => {
        if (report.uniqueId === id) {
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
    },
    setSelectedReportType: (state, { payload }) => {
      state.selectedReportType = payload;
    },
    setIsShowingBanner: (state, { payload }) => {
      state.isShowingBanner = payload;
    }
  }
});

export const {
  setReportList,
  setIsReportSelected,
  setActiveVersion,
  resetReportSelection,
  resetReportApp,
  setLastIndex,
  setSelectedReportType,
  setIsShowingBanner
} = actions;

export default reducer;
