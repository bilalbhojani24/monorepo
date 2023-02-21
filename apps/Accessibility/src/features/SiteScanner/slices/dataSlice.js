import { createSlice } from '@reduxjs/toolkit';

import {
  fetchScanConfigs,
  fetchScanConfigsById
} from '../../../api/siteScannerScanConfigs';
import {
  fetchScanOverviewData,
  fetchScanRuns
} from '../../../api/siteScannerScanDetails';
import { fetchScanLogs } from '../../../api/siteScannerScanReports';

const { actions, reducer } = createSlice({
  name: 'siteScannerData',
  initialState: {
    scanRuns: {},
    scanConfigs: {},
    scanRunCommon: {},
    scanLogs: {},
    scanReportsCommon: {},
    scanReportsOverview: null,
    customData: null,
    reportOverviewMetaData: {
      issueSummary: null,
      meta: null,
      chartData: null
    },
    scanOverviewData: {}
  },
  reducers: {
    setScanConfigsData: (state, { payload }) => {
      state.scanConfigs = payload;
    },
    setScanRuns: (state, { payload }) => {
      state.scanRuns = payload;
    },
    setScanRunCommonData: (state, { payload }) => {
      state.scanRunCommon = payload;
    },
    setScanLogs: (state, { payload }) => {
      state.scanLogs = payload;
    },
    setScanReportCommonData: (state, { payload }) => {
      state.scanReportsCommon = payload;
    },
    setOverviewData: (state, { payload }) => {
      const { reportData, issueSummary, meta, chartData } = payload;
      state.scanReportsOverview = reportData;
      state.reportOverviewMetaData = {
        issueSummary,
        meta,
        chartData
      };
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    },
    setScanOverview: (state, { payload }) => {
      state.scanOverviewData = payload;
    }
  }
});

export const {
  setScanConfigsData,
  setScanRuns,
  setScanRunCommonData,
  setScanLogs,
  setScanReportCommonData,
  setOverviewData,
  setCustomData,
  setScanOverview
} = actions;

export default reducer;

export const getScanConfigs = () => async (dispatch) => {
  fetchScanConfigs()
    .then((data) => {
      // setScanConfigs(data);
      dispatch(setScanConfigsData(data));
    })
    .catch(() => {
      // dispatch(setScanConfigsError(err));
    });
};

export const getScanRuns = () => async (dispatch) => {
  fetchScanRuns()
    .then((data) => {
      dispatch(setScanRuns(data));
      const commonData = { ...data.data };
      delete commonData.reports;
      dispatch(
        setScanRunCommonData({
          ...commonData
        })
      );
    })
    .catch(() => {
      // dispatch(setScanConfigsError(err));
    });
};

export const getScanLogs = () => async (dispatch) => {
  fetchScanLogs()
    .then((data) => {
      dispatch(setScanLogs(data));
      const commonData = { ...data.data };
      delete commonData.reports;
      dispatch(
        setScanReportCommonData({
          ...commonData
        })
      );
    })
    .catch(() => {
      // dispatch(setScanConfigsError(err));
    });
};

export const getScanOverview = (id) => async (dispatch) => {
  fetchScanOverviewData()
    .then((data) => {
      dispatch(setScanOverview(data));
      const commonData = { ...data.data };
      delete commonData.overview;
      dispatch(
        setScanReportCommonData({
          ...commonData
        })
      );
    })
    .catch(() => {
      // dispatch(setScanConfigsError(err));
    });
};
