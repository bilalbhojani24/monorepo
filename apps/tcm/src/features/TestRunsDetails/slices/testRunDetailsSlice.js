import { createSlice } from '@reduxjs/toolkit';

import { STATUS_OPTIONS } from '../const/immutableConst';

const initialState = {
  fullDetails: null,
  isLoading: {
    testRunDetails: true,
    isFoldersLoading: true,
    isTestCasesLoading: true,
    bulkRemoveInProgress: false,
    bulkAssignInProgress: false,
    bulkAddResultInProgress: false,
    usersArray: false
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
  testResultsArray: [],
  bulkOperation: null,
  bulkSelection: {
    ids: []
    // de_selected_ids: [],
    // select_all: false
  },
  assignee: null,
  resultForm: {
    status: STATUS_OPTIONS[0].value,
    jiraIssues: []
  },
  usersArray: null,
  resultIssuesArray: null,
  loadedDataProjectId: null // data fetched for which projectID (to cache data)
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
      state.allTestCases = payload.filter((item) => item); // incase test case is null
    },
    setIsLoadingProps: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    resetResultForm: (state) => {
      state.resultForm = initialState.resultForm;
    },
    updateResultForm: (state, { payload }) => {
      state.resultForm[payload.key] = payload.value;
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
    },
    setIssuesArray: (state, { payload }) => {
      state.issuesArray = payload;
    },
    setResultIssuesArray: (state, { payload }) => {
      state.resultIssuesArray = payload;
    },
    updateBulkOperation: (state, { payload }) => {
      state.bulkOperation = payload;
    },
    setBulkSelectedtestCaseIDs: (state, { payload }) => {
      state.bulkSelection.ids = payload;
    },
    resetBulkSelection: (state) => {
      state.bulkSelection = initialState.bulkSelection;
    },
    setLoadedDataProjectId: (state, { payload }) => {
      state.loadedDataProjectId = payload;
    },
    updateAssignee: (state, { payload }) => {
      state.assignee = payload;
    },
    setUsers: (state, { payload }) => {
      // prefill for edit
      state.usersArray = payload || initialState.usersArray;
    }
  }
});

export const {
  resetResultForm,
  updateResultForm,
  updateAssignee,
  setLoadedDataProjectId,
  setUsers,
  resetBulkSelection,
  setBulkSelectedtestCaseIDs,
  updateBulkOperation,
  addTestResultItem,
  setTestResultsArray,
  setSelectedTestCase,
  setIssuesArray,
  setResultIssuesArray,
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
