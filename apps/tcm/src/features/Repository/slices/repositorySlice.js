import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFolders: [],
  allTestCases: [],
  selectedFolder: null,
  showAddFolderModal: false,
  isAddTestCasePageVisible: false,
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    updateAllFolders: (state, { payload }) => {
      state.allFolders = payload;
    },
    updateAllTestCases: (state, { payload }) => {
      state.allTestCases = payload;
    },
    setAddFolderModalVisibility: (state, { payload }) => {
      state.showAddFolderModal = payload;
    },
    setAddTestCaseVisibility: (state, { payload }) => {
      state.isAddTestCasePageVisible = payload;
    },
    setSelectedFolder: (state, { payload }) => {
      state.selectedFolder = payload;
    },
  },
});

export const {
  updateAllFolders,
  setAddFolderModalVisibility,
  setSelectedFolder,
  updateAllTestCases,
  setAddTestCaseVisibility,
} = repositorySlice.actions;

export default repositorySlice.reducer;
