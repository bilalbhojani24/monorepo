import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestCaseViewVisible: false,
  allData: null,
  metaIds: {
    projectId: null,
    folderId: null,
    testCaseId: null
  },
  testResultsArray: [],
  testObservabilityUrl: null
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
    },
    setTestObservabilityUrl: (state, { payload }) => {
      state.testObservabilityUrl = payload;
    },
    setTestRunsTestCaseDetails: (state, { payload }) => {
      state.testRunsTestCaseDetails = payload;
    }
  }
});

export const {
  setTestCaseViewVisibility,
  setTestRunsTestCaseDetails,
  setTestCaseDetails,
  setMetaIds,
  setTestResultsArray,
  setTestObservabilityUrl
} = testCaseDetailsSlice.actions;

export default testCaseDetailsSlice.reducer;
