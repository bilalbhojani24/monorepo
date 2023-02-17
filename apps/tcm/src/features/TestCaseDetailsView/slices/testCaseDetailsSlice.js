import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isTestCaseViewVisible: false,
  allData: null,
  metaIds: {
    projectId: null,
    folderId: null,
    testCaseId: null
  }
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
    }
  }
});

export const { setTestCaseViewVisibility, setTestCaseDetails, setMetaIds } =
  testCaseDetailsSlice.actions;

export default testCaseDetailsSlice.reducer;
