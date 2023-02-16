import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullDetails: null,
  isLoading: {
    testRunDetails: true
  }
};

export const testRunDetailsSlice = createSlice({
  name: 'testRunsDetails',
  initialState,
  reducers: {
    setTestRunsDetails: (state, { payload }) => {
      state.fullDetails = payload;
    }
  }
});

export const { setTestRunsDetails } = testRunDetailsSlice.actions;

export default testRunDetailsSlice.reducer;
