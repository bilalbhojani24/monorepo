import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTestRunsModal: false,
  allTestRunsArray: [],
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRunsModalVisibility: (state, { payload }) => {
      state.showAddTestRunsModal = payload;
    },
    updateAllTestRuns: (state, { payload }) => {
      state.allTestRunsArray = payload;
    },
  },
});

export const { setAddTestRunsModalVisibility, updateAllTestRuns } =
  testRunslice.actions;
export default testRunslice.reducer;
