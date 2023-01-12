import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddProjectModal: false,
  showEditProjectModal: false,
  showDeleteProjectModal: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setAddProjectModalVisibility: (state, { payload }) => {
      state.showAddProjectModal = payload;
    },
    setEditProjectModalVisibility: (state, { payload }) => {
      state.showEditProjectModal = payload;
    },
    setDeleteProjectModalVisibility: (state, { payload }) => {
      state.showDeleteProjectModal = payload;
    },
  },
});

export const {
  setAddProjectModalVisibility,
  setEditProjectModalVisibility,
  setDeleteProjectModalVisibility,
} = projectSlice.actions;
export default projectSlice.reducer;
