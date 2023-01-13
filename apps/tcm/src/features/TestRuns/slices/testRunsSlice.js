import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTestRunsForm: false,
  allTestRunsArray: [],
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRun: (state, { payload }) => {
      state.showAddTestRunsForm = payload;
    },
    addSingleTestRun: (state, { payload }) => {
      state.allTestRunsArray.push(payload);
    },
    updateAllTestRuns: (state, { payload }) => {
      state.allTestRunsArray = payload;
    },
  },
});

export const { addSingleTestRun, updateAllTestRuns, setAddTestRun } =
  testRunslice.actions;
export default testRunslice.reducer;
