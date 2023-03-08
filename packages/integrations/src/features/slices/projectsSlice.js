import { createSlice } from '@reduxjs/toolkit';

import { getProjectsThunk } from '../../api';

import { LOADING_STATUS } from './constants';

const initialState = {
  projects: [],
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
      state.loading = action.payload;
    });
    builder.addCase(getProjectsThunk.rejected, (state, action) => {
      state.loading = LOADING_STATUS.FAILED;
      state.error = action;
    });
  }
});

export default projectsSlice.reducer;

export const toolAuthLoadingSelector = (state) => state.projects.loading;
export const toolAuthErrorSelector = (state) => state.projects.error;
