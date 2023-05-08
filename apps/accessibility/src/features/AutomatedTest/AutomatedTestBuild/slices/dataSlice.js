import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'buildData',
  initialState: {
    buildData: null,
    customData: null,
    filters: {},
    buildMetaData: {
      issueSummary: null,
      meta: null,
      chartData: null
    }
  },
  reducers: {
    setBuildData: (state, { payload }) => {
      const {
        issueSummary,
        meta_v2: metaV2,
        chartData,
        reportData
      } = payload.data;
      state.buildData = reportData;
      state.buildMetaData = {
        issueSummary,
        meta: metaV2,
        chartData
      };
      state.filters = payload.filters;
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    }
  }
});

export const { setBuildData, setCustomData } = actions;

export default reducer;
