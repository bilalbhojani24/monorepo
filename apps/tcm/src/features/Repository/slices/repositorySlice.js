import { createSlice } from '@reduxjs/toolkit';

import {
  priorityOptions,
  statusOptions,
  templateOptions,
  testCaseTypesOptions,
} from '../const/addTestCaseConst';

const initialState = {
  allFolders: [],
  allTestCases: [],
  selectedFolder: null,
  showAddFolderModal: false,
  isAddTestCasePageVisible: false,
  testCaseFormData: {
    name: '',
    description: '',
    estimate: '',
    case_type: testCaseTypesOptions[0].value,
    priority: priorityOptions[2].value,
    owner: null,
    status: statusOptions[0].value,
    preconditions: '',
    template: templateOptions[0].value,
    steps: [''],
    attachments: [],
    issues: [],
  },
  showEditTestCaseForm: false,
  showAddTagModal: false,
  showAddIssuesModal: false,
  showDeleteTestCaseModal: false,
  selectedTestCase: null,
  loadedDataProjectId: null, // data fetched for which projectID (to cache data)
  usersArray: null,
  tagsArray: [],
  issuesArray: [],
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    updateAllFolders: (state, { payload }) => {
      state.allFolders = payload;
    },
    updateTestCaseFormData: (state, { payload }) => {
      state.testCaseFormData[payload.key] = payload.value;
    },
    updateAllTestCases: (state, { payload }) => {
      state.allTestCases = payload;
    },
    addSingleTestCase: (state, { payload }) => {
      state.allTestCases = [payload, ...state.allTestCases];
    },
    updateTestCase: (state, { payload }) => {
      state.allTestCases = state.allTestCases.map((item) =>
        item.id === payload.id ? payload : item,
      );
    },
    setAddFolderModalVisibility: (state, { payload }) => {
      state.showAddFolderModal = payload;
    },
    setAddTestCaseVisibility: (state, { payload }) => {
      state.isAddTestCasePageVisible = payload;

      if (payload) {
        // reset form data
        state.testCaseFormData = initialState.testCaseFormData;
      }
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
    setAddTagModal: (state, { payload }) => {
      state.showAddTagModal = payload;
    },
    setAddIssuesModal: (state, { payload }) => {
      state.showAddIssuesModal = payload;
    },
    setEditTestCasePageVisibility: (state, { payload }) => {
      state.showEditTestCaseForm = payload;
    },
    setDeleteTestCaseModalVisibility: (state, { payload }) => {
      state.showDeleteTestCaseModal = payload;

      if (!state.selectedTestCase) state.selectedTestCase = null;
    },
    setSelectedTestCase: (state, { payload }) => {
      state.selectedTestCase = payload;
    },
    deleteTestCase: (state, { payload }) => {
      state.allTestCases = state.allTestCases.filter(
        (item) => item.id !== payload.id,
      );
    },
    setTestCaseFormData: (state, { payload }) => {
      // prefill for edit
      state.testCaseFormData = payload || initialState.testCaseFormData;
    },
    setUsers: (state, { payload }) => {
      // prefill for edit
      state.usersArray = payload || initialState.usersArray;
    },
    setTagsArray: (state, { payload }) => {
      state.tagsArray = payload;
    },
    setIssuesArray: (state, { payload }) => {
      state.issuesArray = payload;
    },
    setLoadedDataProjectId: (state, { payload }) => {
      state.loadedDataProjectId = payload;
    },
  },
});

export const {
  setLoadedDataProjectId,
  setTagsArray,
  addSingleTestCase,
  updateAllFolders,
  setAddFolderModalVisibility,
  setSelectedFolder,
  updateAllTestCases,
  setAddTestCaseVisibility,
  updateTestCaseFormData,
  setDeleteTestCaseModalVisibility,
  setEditTestCasePageVisibility,
  setSelectedTestCase,
  deleteTestCase,
  setTestCaseFormData,
  updateTestCase,
  setUsers,
  setAddTagModal,
  setAddIssuesModal,
  setIssuesArray,
} = repositorySlice.actions;

export default repositorySlice.reducer;
