import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: {
    activeTR: true,
    closedTRMonthly: true,
    closedTRDaily: true,
    typeOfTC: true,
    trendOfTC: true,
    jiraIssues: true
  }
};

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTestRunsFulfilled: (state, { payload }) => {
      state.activeTestRuns = payload;
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    }
  }
});

export const { setActiveTestRunsFulfilled, setIsLoadingProps } =
  dashboardSlice.actions;
export default dashboardSlice.reducer;
