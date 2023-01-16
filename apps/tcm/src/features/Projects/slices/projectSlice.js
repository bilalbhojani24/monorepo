import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddProjectModal: false,
  showEditProjectModal: false,
  showDeleteProjectModal: false,
  selectedProject: null,
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

      if (!state.selectedProject) state.selectedProject = null;
    },
    setDeleteProjectModalVisibility: (state, { payload }) => {
      state.showDeleteProjectModal = payload;

      if (!state.selectedProject) state.selectedProject = null;
    },
    setSelectedProject: (state, { payload }) => {
      state.selectedProject = payload;
    },
  },
});

export const {
  setAddProjectModalVisibility,
  setEditProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setSelectedProject,
} = projectSlice.actions;
export default projectSlice.reducer;
