import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  projects: [
    { label: 'Project 1', value: 'p1' },
    { label: 'Project 2', value: 'p2' },
    { label: 'Project 3', value: 'p3' },
  ],
  selectedProjectId: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.projects = payload;
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setSelectedProject: (state, { payload }) => {
      state.selectedProjectId = payload;
    },
  },
});

export const { setProjects, setUser, setSelectedProject } = globalSlice.actions;

export default globalSlice.reducer;
