import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  allProjects: [],
  selectedProjectId: null,
  loginUrl: ''
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
    setLoginURL: (state, { payload }) => {
      state.loginUrl = payload;
    },
    setSelectedProject: (state, { payload }) => {
      state.selectedProjectId = payload;
    }
  }
});

export const { setAllProjects, setUser, setSelectedProject, setLoginURL } =
  globalSlice.actions;

export default globalSlice.reducer;
