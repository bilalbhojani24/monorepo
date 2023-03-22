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
    case_type: testCaseTypesOptions[7].value,
    priority: priorityOptions[2].value,
    owner: null,
    status: statusOptions[0].value,
    preconditions: '',
    template: templateOptions[0].value,
    steps: [''],
    attachments: [],
    issues: [],
    tags: [],
    test_case_folder_id: null // this is for internal process not to be passed with API
  },
  testCaseBulkFormData: {
    case_type: null,
    priority: null,
    owner: null,
    status: null,
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
  isSearchFilterDoneOnce: false,
  isSearchFilterView: false,
  searchInitiatedFromURL: '',
  isLoading: {
    folder: true,
    testCases: true,
    // folder cta's
    addFolderCta: false,
    editFolderCta: false,
    addSubFolderCta: false,
    deleteFolderCta: false,
    moveFolderCta: false,
    // test case cta's
    createTestCaseCta: false,
    editTestCaseCta: false,
    deleteTestCaseCta: false,
    bulkEditTestCaseCta: false,
    bulkDeleteTestCaseCta: false,
    bulkMoveTestCaseCta: false,
    tags: true
  },
  isUnsavedDataExists: false,
  isUnsavedDataModalVisible: false,
  recentRequestedAfterUnsaved: '',
  testCaseDetails: {
    folderId: null,
    testCaseId: null
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
        state.testCaseFormData = {
          ...initialState.testCaseFormData,
          test_case_folder_id: !Number.isNaN(payload) ? payload : null
        };
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
      state.metaPage = !payload ? initialState.metaPage : payload;
    },
    setFilterSearchMeta: (state, { payload }) => {
      state.filterSearchMeta = payload;

      if (!state.isSearchFilterDoneOnce) state.isSearchFilterDoneOnce = true;
    },
    resetFilterSearchMeta: (state) => {
      state.filterSearchMeta = initialState.filterSearchMeta;
    },
    resetFilterMeta: (state) => {
      state.filterSearchMeta = {
        ...initialState.filterSearchMeta,
        q: state.filterSearchMeta.q
      };
    },
    setFilterSearchView: (state, { payload }) => {
      state.isSearchFilterView = payload;

      if (!payload) {
        state.searchInitiatedFromURL = null;
      }
    },
    setSearchInitiatedURL: (state, { payload }) => {
      state.searchInitiatedFromURL = payload;
    },
    setUnsavedDataExists: (state, { payload }) => {
      state.isUnsavedDataExists = payload;
    },
    setUnsavedDataModal: (state, { payload }) => {
      state.isUnsavedDataModalVisible = payload;
    },
    setRecentRquestedAfterUnsaved: (state, { payload }) => {
      state.recentRequestedAfterUnsaved = payload;
    },
    setTestCaseDetails: (state, { payload }) => {
      state.testCaseDetails = payload;
    },
    resetTestCaseDetails: (state) => {
      state.testCaseDetails = initialState.testCaseDetails;
    },
    updateCtaLoading: (state, { payload }) => {
      state.isLoading[payload.key] = payload.value;
    },
    cleanUpValues: (state) => {
      state.testCaseDetails = initialState.testCaseDetails;
      state.allFolders = initialState.allFolders;
    }
  }
});

export const {
  cleanUpValues,
  setSearchInitiatedURL,
  setTestCaseDetails,
  resetTestCaseDetails,
  setRecentRquestedAfterUnsaved,
  setUnsavedDataModal,
  setUnsavedDataExists,
  resetFilterMeta,
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
  setAddTestCaseFromSearch,
  updateCtaLoading
} = repositorySlice.actions;

export default repositorySlice.reducer;
