import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'testData',
  initialState: {
    testData: null,
    customData: null,
    filters: {},
    testMetaData: {
      issueSummary: null,
      meta: null,
      chartData: null
    }
  },
  reducers: {
    setTestData: (state, { payload }) => {
      const {
        reportData,
        issueSummary,
        meta_v2: metaV2,
        chartData,
        filters
      } = payload;
      state.testData = reportData;
      state.testMetaData = {
        issueSummary,
        meta: metaV2,
        chartData
      };
      state.filters = filters;
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    }
  }
});

export const { setTestData, setCustomData } = actions;

export default reducer;
