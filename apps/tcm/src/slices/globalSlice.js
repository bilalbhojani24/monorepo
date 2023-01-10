import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  activeProjects: [],
  selectedProjectId: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.activeProjects = payload;
    },
    updateProjects: (state, { payload }) => {
      state.activeProjects.push(payload);
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSelectedProject: (state, { payload }) => {
      state.selectedProjectId = payload;
    },
  },
});

export const { setProjects, setUser, setSelectedProject, updateProjects } =
  globalSlice.actions;

export default globalSlice.reducer;
