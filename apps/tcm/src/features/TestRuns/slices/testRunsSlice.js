import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTestRunsForm: false,
  allTestRunsArray: [],
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
    updateAllTestRuns: (state, { payload }) => {
      state.allTestRunsArray = payload;
    },
  },
});

export const { setAddTestRunsModalVisibility, updateAllTestRuns } =
  testRunslice.actions;
export default testRunslice.reducer;
