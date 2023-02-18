import { createSlice } from '@reduxjs/toolkit';

const initialState = { activeTestRuns: {} };

export const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setActiveTestRuns: (state, { payload }) => {
      state.activeTestRuns = payload;
    }
  }
});

export const { setActiveTestRuns } = dashboardSlice.actions;

export default dashboardSlice.reducer;
