import { createSlice } from '@reduxjs/toolkit';

import fetchScanConfigs from '../../../api/scanConfigs';

const { actions, reducer } = createSlice({
  name: 'siteScannerData',
  initialState: {
    scanConfigs: {}
  },
  reducers: {
    setScanConfigsData: (state, { payload }) => {
      state.scanConfigs = payload;
    }
    // setReportData: (state, { payload }) => {
    //   const { reportData, issueSummary, meta, chartData } = payload;
    //   state.reportData = reportData;
    //   state.reportMetaData = {
    //     issueSummary,
    //     meta,
    //     chartData
    //   };
    // },
    // setCustomData: (state, { payload }) => {
    //   state.customData = payload;
    // },
    // resetReportData: (state) => {
    //   state.reportData = null;
    //   state.reportMetaData = {
    //     issueSummary: null,
    //     meta: null,
    //     chartData: null
    //   };
    // }
  }
});

export const { setScanConfigsData } = actions;

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
