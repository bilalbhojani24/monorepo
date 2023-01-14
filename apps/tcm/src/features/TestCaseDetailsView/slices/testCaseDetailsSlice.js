import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestCaseViewVisible: false,
  testCaseDetails: null,
};

export const testCaseDetailsSlice = createSlice({
  name: 'testCaseDetails',
  initialState,
  reducers: {
    setTestCaseViewVisibility: (state, { payload }) => {
      state.isTestCaseViewVisible = payload;
    },
    setTestCaseDetails: (state, { payload }) => {
      state.testCaseDetails = payload;
    },
  },
});

export const { setTestCaseViewVisibility, setTestCaseDetails } =
  testCaseDetailsSlice.actions;

export default testCaseDetailsSlice.reducer;
