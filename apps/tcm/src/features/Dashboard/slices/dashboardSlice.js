import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeTestRuns: {} };

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTestRunsFulfilled: (state, { payload }) => {
      state.activeTestRuns = payload;
    }
  }
});

export const { setActiveTestRunsFulfilled } = dashboardSlice.actions;
export default dashboardSlice.reducer;
