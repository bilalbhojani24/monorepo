import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  projects: [
    { label: 'Project 1', value: 'p1' },
    { label: 'Project 2', value: 'p2' },
    { label: 'Project 3', value: 'p3' },
  ],
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
  },
});

export const { setProjects, setUser } = globalSlice.actions;

export default globalSlice.reducer;
