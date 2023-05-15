import { createSlice } from '@reduxjs/toolkit';

const { actions, reducer } = createSlice({
  name: 'buildData',
  initialState: {
    buildData: null,
    customData: null,
    filters: {},
    buildMetaData: null,
    testCasesData: null
  },
  reducers: {
    setBuildData: (state, { payload }) => {
      const { data, filters } = payload;
      state.buildData = data;
      state.filters = filters;
    },
    setBuildMetaData: (state, { payload }) => {
      state.buildMetaData = {
        ...state.buildMetaData,
        meta: payload
      };
    },
    setBuildOverview: (state, { payload }) => {
      const { chartData, issueSummary, trendData } = payload;
      state.buildMetaData = {
        ...state.buildMetaData,
        issueSummary,
        chartData,
        trendData
      };
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    },
    setTestCasesData: (state, { payload }) => {
      const { testCases } = payload;
      state.testCasesData = testCases;
    }
  }
});

export const {
  setBuildData,
  setCustomData,
  setBuildMetaData,
  setBuildOverview,
  setTestCasesData
} = actions;

export default reducer;
