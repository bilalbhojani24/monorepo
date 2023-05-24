import { createSlice } from '@reduxjs/toolkit';

const initState = {
  buildData: null,
  customData: null,
  filters: {},
  buildMetaData: null,
  testCasesData: null
};

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
      const { chartData, issueSummary, trendData, healthSummary } = payload;
      state.buildMetaData = {
        ...state.buildMetaData,
        issueSummary,
        healthSummary,
        chartData,
        trendData
      };
    },
    setCustomData: (state, { payload }) => {
      state.customData = payload;
    },
    setTestCasesData: (state, { payload }) => {
      const { testCases, filters } = payload;
      state.testCasesData = testCases;
      state.filters = filters;
    },
    resetBuildData: (state) => {
      Object.keys(initState).forEach((key) => {
        state[key] = initState[key];
      });
    }
  }
});

export const {
  setBuildData,
  setCustomData,
  setBuildMetaData,
  setBuildOverview,
  setTestCasesData,
  resetBuildData
} = actions;

export default reducer;
