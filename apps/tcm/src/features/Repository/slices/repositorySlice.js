import { createSlice } from '@reduxjs/toolkit';

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
    type: '',
    priority: '',
    owner: '',
    state: '',
    precondition: '',
  },
  showEditTestCaseForm: false,
  showDeleteTestCaseModal: false,
  selectedTestCase: null,
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
      state.allTestCases.push(payload);
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
  },
});

export const {
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
} = repositorySlice.actions;

export default repositorySlice.reducer;
