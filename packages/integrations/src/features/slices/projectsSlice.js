import { createSlice } from '@reduxjs/toolkit';

import { getProjectsThunk } from '../../api';

import { LOADING_STATUS } from './constants';

const initialState = {
  listOfProjects: [],
  loading: LOADING_STATUS.IDLE,
  error: null
};

export const projectsSlice = createSlice({
  name: 'projects',
  initialState,

  extraReducers: (builder) => {
    builder.addCase(getProjectsThunk.pending, (state) => {
      state.loading = LOADING_STATUS.PENDING;
      state.error = null;
    });
    builder.addCase(getProjectsThunk.fulfilled, (state, action) => {
      state.loading = LOADING_STATUS.SUCCEEDED;
      const cleanedProjects = action.payload.reduce((acc, currProject) => {
        const { icon } = currProject;
        const image = Object.values(icon)[0];
        acc.push({ ...currProject, image });
        return acc;
      }, []);
      state.listOfProjects = cleanedProjects;
    });
    builder.addCase(getProjectsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action;
    });
  }
});

export default projectsSlice.reducer;

export const projectsSelector = (state) => state.projects.listOfProjects;
export const projectsLoadingSelector = (state) => state.projects.loading;
export const projectsErrorSelector = (state) => state.projects.error;
