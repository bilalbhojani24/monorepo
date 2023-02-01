import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  activeProjects: [],
  selectedProjectId: null,
  loginUrl: ''
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.activeProjects = payload;
    },
    addProject: (state, { payload }) => {
      state.activeProjects = [payload, ...state.activeProjects];
    },
    updateProject: (state, { payload }) => {
      state.activeProjects = state.activeProjects.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    deleteProject: (state, { payload }) => {
      state.activeProjects = state.activeProjects.filter(
        (item) => item.id !== payload.id
      );
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoginURL: (state, { payload }) => {
      state.loginUrl = payload;
    },
    setSelectedProject: (state, { payload }) => {
      state.selectedProjectId = payload;
    }
  }
});

export const {
  updateProject,
  deleteProject,
  setProjects,
  setUser,
  setSelectedProject,
  addProject,
  setLoginURL
} = globalSlice.actions;

export default globalSlice.reducer;
