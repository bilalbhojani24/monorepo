import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddProjectModal: false,
  showEditProjectModal: false,
  showDeleteProjectModal: false,
  selectedProject: null,
  projects: [],
  metaPage: {
    page: null,
    next: null,
    prev: null,
    count: null
  }
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.projects = payload;
    },
    addProject: (state, { payload }) => {
      state.projects = [payload, ...state.projects];
    },
    updateProject: (state, { payload }) => {
      state.projects = state.projects.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    deleteProject: (state, { payload }) => {
      state.projects = state.projects.filter((item) => item.id !== payload.id);
    },
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
    setMetaPage: (state, { payload }) => {
      state.metaPage = payload;
    }
  }
});

export const {
  setProjects,
  addProject,
  updateProject,
  deleteProject,
  setAddProjectModalVisibility,
  setEditProjectModalVisibility,
  setDeleteProjectModalVisibility,
  setSelectedProject,
  setMetaPage
} = projectSlice.actions;
export default projectSlice.reducer;
