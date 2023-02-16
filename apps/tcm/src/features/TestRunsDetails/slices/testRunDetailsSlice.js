import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullDetails: null,
  isLoading: {
    testRunDetails: true,
    isFoldersLoading: true,
    isTestCasesLoading: true
  },
  allFolders: null, // so that the folders are loaded by the component
  allTestCases: [],
  selectedFolder: null,
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null,
    page_size: null
  }
};

export const testRunDetailsSlice = createSlice({
  name: 'testRunsDetails',
  initialState,
  reducers: {
    setTestRunsDetails: (state, { payload }) => {
      state.fullDetails = payload;
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
    setAllFolders: (state, { payload }) => {
      state.allFolders = payload;
    },
    setAllTestCases: (state, { payload }) => {
      state.allTestCases = payload;
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    }
  }
});

export const {
  setMetaPage,
  setTestRunsDetails,
  setIsLoadingProps,
  setSelectedFolder,
  setAllFolders,
  setAllTestCases
} = testRunDetailsSlice.actions;

export default testRunDetailsSlice.reducer;
