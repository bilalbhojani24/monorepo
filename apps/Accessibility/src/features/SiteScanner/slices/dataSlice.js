import { createSlice } from '@reduxjs/toolkit';

import fetchScanConfigs from '../../../api/siteScannerScanConfigs';
import { fetchScanRuns } from '../../../api/siteScannerScanDetails';
import { fetchScanLogs } from '../../../api/siteScannerScanReports';

const { actions, reducer } = createSlice({
  name: 'siteScannerData',
  initialState: {
    scanRuns: {},
    scanConfigs: {},
    scanRunCommon: {},
    scanLogs: {},
    scanReportsCommon: {}
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
    }
  }
});

export const {
  setScanConfigsData,
  setScanRuns,
  setScanRunCommonData,
  setScanLogs,
  setScanReportCommonData
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
