import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allFolders: [],
};

export const repositorySlice = createSlice({
  name: 'repository',
  initialState,
  reducers: {
    updateAllFolders: (state, { payload }) => {
      state.allFolders = payload;
    },
  },
});

export const { updateAllFolders } = repositorySlice.actions;

export default repositorySlice.reducer;
