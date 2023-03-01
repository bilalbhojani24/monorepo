import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'siteScannerReport',
  initialState: {
    reportData: null,
    customData: null,
    reportMetaData: {
      issueSummary: null,
      meta: null,
      chartData: null
    }
  },
  reducers: {
    setReportData: (state, { payload }) => {
      const { reportData, issueSummary, meta, chartData } = payload;
      state.reportData = reportData;
      state.reportMetaData = {
        issueSummary,
        meta,
        chartData
      };
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    },
    resetReportData: (state) => {
      state.reportData = null;
      state.reportMetaData = {
        issueSummary: null,
        meta: null,
        chartData: null
      };
    }
  }
});

export const { setReportData, setCustomData, resetReportData } = actions;

export default reducer;
