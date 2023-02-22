import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  allProjects: [],
  selectedProjectId: null,
  userConfig: {
    jira: null
  }
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setAllProjects: (state, { payload }) => {
      state.allProjects = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSelectedProject: (state, { payload }) => {
      if (payload !== state.selectedProjectId)
        state.selectedProjectId = payload;
    },
    addGlobalProject: (state, { payload }) => {
      state.allProjects = [payload, ...state.allProjects];
    },
    updateGlobalProject: (state, { payload }) => {
      state.allProjects = state.allProjects.map((item) =>
        item.id === payload.id ? payload : item
      );
    },
    setUserConfig: (state, { payload }) => {
      state.userConfig[payload.key] = payload.value;
    },
    deleteGlobalProject: (state, { payload }) => {
      state.allProjects = state.allProjects.filter(
        (item) => item.id !== payload.id
      );
    }
  }
});

export const {
  setUserConfig,
  setAllProjects,
  setUser,
  setSelectedProject,
  addGlobalProject,
  updateGlobalProject,
  deleteGlobalProject
} = globalSlice.actions;

export default globalSlice.reducer;
