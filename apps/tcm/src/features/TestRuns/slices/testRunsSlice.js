import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddTestRunsModal: false,
};

const testRunslice = createSlice({
  name: 'testRuns',
  initialState,
  reducers: {
    setAddTestRunsModalVisibility: (state, { payload }) => {
      state.showAddTestRunsModal = payload;
    },
  },
});

export const { setAddTestRunsModalVisibility } = testRunslice.actions;
export default testRunslice.reducer;
