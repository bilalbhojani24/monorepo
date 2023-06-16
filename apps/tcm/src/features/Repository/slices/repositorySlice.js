import { createSlice } from '@reduxjs/toolkit';

import { templateOptions } from '../const/addTestCaseConst';

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
    case_type: null,
    priority: null,
    owner: null,
    status: null,
    preconditions: '',
    template: templateOptions[0].value,
    steps: [''],
    attachments: [],
    issues: [],
    tags: [],
    custom_fields: {},
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
    tags: true,
    uploadingAttachments: false,
    formFields: true
  },
  isUnsavedDataExists: false,
  isUnsavedDataModalVisible: false,
  recentRequestedAfterUnsaved: '',
  testCaseDetails: {
    folderId: null,
    testCaseId: null
  },
  customFieldData: {
    projectId: null,
    fields: []
  },
  searchEmptyText: '',
  priorityOptions: [],
  statusOptions: [],
  automationOptions: [],
  testCaseTypeOptions: [],
  priorityValueAndIntNameMapTC: {},
  priorityValueAndNameMapTC: {}
};

const defaultFieldFormatter = (options) =>
  options.map((item) => ({
    ...item,
    label: item?.name,
    value: item?.value
  }));

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    setAllFolders: (state, { payload }) => {
      state.allFolders = [...payload];
    },
    setDefaultFormFieldsData: (state, { payload }) => {
      state.priorityOptions = defaultFieldFormatter(payload?.priority);
      state.automationOptions = defaultFieldFormatter(
        payload?.automation_status
      );
      state.statusOptions = defaultFieldFormatter(payload?.status);
      state.testCaseTypeOptions = defaultFieldFormatter(payload?.case_type);

      state.priorityValueAndIntNameMapTC = payload?.priority.reduce(
        (obj, item) => ({ ...obj, [item.value]: item.internal_name }),
        {}
      );
      state.priorityValueAndNameMapTC = payload?.priority.reduce(
        (obj, item) => ({ ...obj, [item.value]: item.name }),
        {}
      );
      state.priorityIntNameAndValueMapTC = payload?.priority.reduce(
        (obj, item) => ({ ...obj, [item.internal_name]: item.value }),
        {}
      );
      state.statusIntNameAndValueMapTC = payload?.status.reduce(
        (obj, item) => ({ ...obj, [item.internal_name]: item.value }),
        {}
      );
      state.testCaseTypeIntNameAndValueMapTC = payload?.case_type.reduce(
        (obj, item) => ({ ...obj, [item.internal_name]: item.value }),
        {}
      );
    },
    setCustomFieldsData: (state, { payload }) => {
      state.customFieldData = payload;
    },
    updateTestCaseFormData: (state, { payload }) => {
      state.testCaseFormData[payload.key] = payload.value;
    },
    updateTestCaseFormCFData: (state, { payload }) => {
      state.testCaseFormData.custom_fields[payload.key] = payload.value;
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
    updateTestCasesOnSF: (state, { payload }) => {
      const testCases = payload.test_cases.map((item) => ({
        ...item,
        folders: payload?.folders?.[item.test_case_folder_id] || null
      }));

      state.metaPage = !payload?.info ? initialState.metaPage : payload.info;
      state.allTestCases = testCases;
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
          test_case_folder_id:
            !Number.isNaN(payload) && typeof payload !== 'boolean'
              ? payload
              : state?.allFolders[0]?.id
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
    resetBulkFormData: (state) => {
      state.testCaseBulkFormData = initialState.testCaseBulkFormData;
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
      if (!payload) state.isUnsavedDataModalVisible = false;
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
      state.customFieldData = initialState.customFieldData;
    },
    setSearchEmptyText: (state, { payload }) => {
      state.searchEmptyText = payload;
    }
  }
});

export const {
  setSearchEmptyText,
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
  updateTestCasesOnSF,
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
  resetBulkFormData,
  updateBulkTestCaseFormData,
  updateTestCasesListLoading,
  updateFoldersLoading,
  setMetaPage,
  setFilterSearchView,
  updateLoader,
  setAddTestCaseFromSearch,
  updateCtaLoading,
  setDefaultFormFieldsData,
  setCustomFieldsData,
  updateTestCaseFormCFData
} = repositorySlice.actions;

export default repositorySlice.reducer;
