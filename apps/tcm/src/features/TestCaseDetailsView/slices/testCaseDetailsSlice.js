import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestCaseViewVisible: false,
  allData: null,
  metaIds: {
    projectId: null,
    folderId: null,
    testCaseId: null
  },
  testResultsArray: []
};

export const testCaseDetailsSlice = createSlice({
  name: 'testCaseDetails',
  initialState,
  reducers: {
    setTestCaseViewVisibility: (state, { payload }) => {
      state.isTestCaseViewVisible = payload;
    },
    setMetaIds: (state, { payload }) => {
      state.metaIds = payload;
    },
    setTestCaseDetails: (state, { payload }) => {
      state.allData = payload;
    },
    setTestResultsArray: (state, { payload }) => {
      state.testResultsArray = payload;
    }
  }
});

export const {
  setTestCaseViewVisibility,
  setTestCaseDetails,
  setMetaIds,
  setTestResultsArray
} = testCaseDetailsSlice.actions;

export default testCaseDetailsSlice.reducer;
