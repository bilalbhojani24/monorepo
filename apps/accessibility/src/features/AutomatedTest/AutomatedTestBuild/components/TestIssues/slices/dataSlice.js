import { createSlice } from '@reduxjs/toolkit';

const initState = {
  testData: null,
  customData: null,
  filters: {},
  testMetaData: {
    issueSummary: null,
    meta: null,
    chartData: null
  }
};

const { actions, reducer } = createSlice({
  name: 'testData',
  initialState: {
    ...initState
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
    },
    resetInitialState: (state) => {
      Object.entries(initState).forEach(([key, value]) => {
        state[key] = value;
      });
    }
  }
});

export const { setTestData, setCustomData, resetInitialState } = actions;

export default reducer;
