import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  fullDetails: null,
  isLoading: {
    testRunDetails: true,
    isFoldersLoading: true,
    isTestCasesLoading: true
  },
  isVisible: {
    addStatus: false,
    addIssues: false
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
  },
  testCaseDetails: {
    projectId: null,
    folderId: null,
    testCaseId: null
  },
  addStatusForm: {
    status: '',
    description: '',
    issues: []
  },
  issuesArray: [],
  selectedTestCase: null,
  testResultsArray: []
};

export const testRunDetailsSlice = createSlice({
  name: 'testRunsDetails',
  initialState,
  reducers: {
    setTestRunsDetails: (state, { payload }) => {
      state.fullDetails = payload;

      if (!payload) state.testCaseDetails = initialState.testCaseDetails;
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
    setIsVisibleProps: (state, { payload }) => {
      state.isVisible[payload.key] = payload.value;
    },
    updateAddStatusForm: (state, { payload }) => {
      state.addStatusForm[payload.key] = payload.value;
    },
    initAddStatusForm: (state, { payload }) => {
      state.addStatusForm = payload
        ? { ...initialState.addStatusForm, status: payload }
        : initialState.addStatusForm;
    },
    closeAllVisibleForms: (state) => {
      state.isVisible = initialState.isVisible;
    },
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    },
    setTestResultsArray: (state, { payload }) => {
      state.testResultsArray = payload;
    },
    addTestResultItem: (state, { payload }) => {
      state.testResultsArray = [payload, ...state.testResultsArray];
    },
    setTestCaseDetails: (state, { payload }) => {
      state.testCaseDetails = payload;
    },
    setSelectedTestCase: (state, { payload }) => {
      state.selectedTestCase = payload;
    },
    resetTestCaseDetails: (state) => {
      state.testCaseDetails = initialState.testCaseDetails;
      state.isLoading.testRunDetails = true;
    },
    setIssuesArray: (state, { payload }) => {
      state.issuesArray = payload;
    }
  }
});

export const {
  addTestResultItem,
  setTestResultsArray,
  setSelectedTestCase,
  setIssuesArray,
  initAddStatusForm,
  updateAddStatusForm,
  closeAllVisibleForms,
  setIsVisibleProps,
  resetTestCaseDetails,
  setTestCaseDetails,
  setMetaPage,
  setTestRunsDetails,
  setIsLoadingProps,
  setSelectedFolder,
  setAllFolders,
  setAllTestCases
} = testRunDetailsSlice.actions;

export default testRunDetailsSlice.reducer;
