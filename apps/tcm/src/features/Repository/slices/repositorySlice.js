import { createSlice } from '@reduxjs/toolkit';

import {
  priorityOptions,
  statusOptions,
  templateOptions,
  testCaseTypesOptions
} from '../const/addTestCaseConst';

const initialState = {
  allFolders: [],
  allTestCases: [],
  selectedFolder: null,
  isAddTestCasePageVisible: false,
  isAddTestCaseFromSearch: false,
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
    tags: []
  },
  testCaseBulkFormData: {
    case_type: null,
    priority: priorityOptions[2].value,
    owner: null,
    status: statusOptions[0].value,
    preconditions: '',
    issues: []
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
  openedFolderModal: null,
  bulkSelection: {
    ids: [],
    de_selected_ids: [],
    select_all: false
  },
  isBulkUpdateInit: false,
  isBulkEditPageVisible: false,
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null
  },
  filterSearchMeta: {
    owner: [],
    tags: [],
    priority: [],
    q: ''
  },
  isSearchFilterView: false,
  isLoading: {
    folder: true,
    testCases: true
  }
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setAllFolders: (state, { payload }) => {
      state.allFolders = [...payload];
    },
    updateTestCaseFormData: (state, { payload }) => {
      state.testCaseFormData[payload.key] = payload.value;
    },
    updateBulkTestCaseFormData: (state, { payload }) => {
      state.testCaseBulkFormData[payload.key] = payload.value;
    },
    updateTestCasesListLoading: (state, { payload }) => {
      state.isLoading.testCases = payload;
    },
    updateFoldersLoading: (state, { payload }) => {
      state.isLoading.folder = payload;
    },
    updateAllTestCases: (state, { payload }) => {
      state.allTestCases = payload;
    },
    addSingleTestCase: (state, { payload }) => {
      state.allTestCases = [payload, ...state.allTestCases];
    },
    setAddTestCaseFromSearch: (state, { payload }) => {
      state.isAddTestCaseFromSearch = payload;
    },
    updateTestCase: (state, { payload }) => {
      state.allTestCases = state.allTestCases.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    setAddTestCaseVisibility: (state, { payload }) => {
      state.isAddTestCasePageVisible = payload;
      if (payload) {
        // reset form data
        state.testCaseFormData = initialState.testCaseFormData;
      }
    },
    setSelectedFolder: (state, { payload }) => {
      if (state.selectedFolder?.id !== payload?.id)
        state.bulkSelection = initialState.bulkSelection; // reset selected rows if folder changes

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
    setFolderModalConf: (state, { payload }) => {
      state.openedFolderModal = payload;
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
        (item) => !payload.includes(item.id)
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
    setBulkSelectedtestCaseIDs: (state, { payload }) => {
      state.bulkSelection.ids = payload;
    },
    setBulkDeSelectedtestCaseIDs: (state, { payload }) => {
      state.bulkSelection.de_selected_ids = payload;
    },
    setBulkAllSelected: (state, { payload }) => {
      state.bulkSelection.select_all = payload;
    },
    resetBulkSelection: (state) => {
      state.bulkSelection = initialState.bulkSelection;
    },
    setIssuesArray: (state, { payload }) => {
      state.issuesArray = payload;
    },
    setBulkUpdateProgress: (state, { payload }) => {
      state.isBulkUpdateInit = payload;
    },
    setLoadedDataProjectId: (state, { payload }) => {
      state.loadedDataProjectId = payload;
    },
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    },
    setFilterSearchMeta: (state, { payload }) => {
      state.filterSearchMeta = payload;
    },
    resetFilterSearchMeta: (state) => {
      state.filterSearchMeta = initialState.filterSearchMeta;
    },
    setFilterSearchView: (state, { payload }) => {
      state.isSearchFilterView = payload;
    }
  }
});

export const {
  resetFilterSearchMeta,
  setFilterSearchMeta,
  setFolderModalConf,
  setLoadedDataProjectId,
  setTagsArray,
  addSingleTestCase,
  setAllFolders,
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
  setBulkSelectedtestCaseIDs,
  setBulkDeSelectedtestCaseIDs,
  setBulkAllSelected,
  setBulkUpdateProgress,
  resetBulkSelection,
  updateBulkTestCaseFormData,
  updateTestCasesListLoading,
  updateFoldersLoading,
  setMetaPage,
  setFilterSearchView,
  updateLoader,
  setAddTestCaseFromSearch
} = repositorySlice.actions;

export default repositorySlice.reducer;
