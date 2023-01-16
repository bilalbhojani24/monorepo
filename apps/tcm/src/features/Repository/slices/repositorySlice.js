import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFolders: [],
  allTestCases: [],
  selectedFolder: null,
  showAddFolderModal: false,
  isAddTestCasePageVisible: false,
  newTestCaseData: {
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
      state.newTestCaseData[payload.key] = payload.value;
    },
    updateAllTestCases: (state, { payload }) => {
      state.allTestCases = payload;
    },
    addSingleTestCase: (state, { payload }) => {
      state.allTestCases.push(payload);
    },
    setAddFolderModalVisibility: (state, { payload }) => {
      state.showAddFolderModal = payload;
    },
    setAddTestCaseVisibility: (state, { payload }) => {
      state.isAddTestCasePageVisible = payload;

      if (payload) {
        // reset form data
        state.newTestCaseData = initialState.newTestCaseData;
      }
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
    setEditTestCaseModalVisibility: (state, { payload }) => {
      state.showEditTestCaseForm = payload;

      if (!state.selectedTestCase) state.selectedTestCase = null;
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
  setEditTestCaseModalVisibility,
  setSelectedTestCase,
  deleteTestCase,
} = repositorySlice.actions;

export default repositorySlice.reducer;
