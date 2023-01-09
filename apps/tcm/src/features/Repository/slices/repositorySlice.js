import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFolders: [],
  showAddFolderModal: false,
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    updateAllFolders: (state, { payload }) => {
      state.allFolders = payload;
    },
    setAddFolderModalVisibility: (state, { payload }) => {
      state.showAddFolderModal = payload;
    },
  },
});

export const { updateAllFolders, setAddFolderModalVisibility } =
  repositorySlice.actions;

export default repositorySlice.reducer;
