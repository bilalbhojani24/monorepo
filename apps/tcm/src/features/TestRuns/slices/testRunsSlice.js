import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTestRuns: [],
  addTestRun: false,
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setTestRuns: (state, { payload }) => {
      state.activeTestRuns = payload;
    },
    setAddTestRun: (state, { payload }) => {
      state.addTestRun = payload;
    },
  },
});

export const { setTestRuns, setAddTestRun } = testRunslice.actions;
export default testRunslice.reducer;
