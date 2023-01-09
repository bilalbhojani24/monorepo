import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProjects: [],
  showAddProjectModal: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, { payload }) => {
      state.allProjects = payload;
    },
    updateProjects: (state, { payload }) => {
      state.allProjects.push(payload);
    },
    setAddProjectModalVisibility: (state, { payload }) => {
      state.showAddProjectModal = payload;
    },
  },
});

export const { setProjects, updateProjects, setAddProjectModalVisibility } =
  projectSlice.actions;
export default projectSlice.reducer;
