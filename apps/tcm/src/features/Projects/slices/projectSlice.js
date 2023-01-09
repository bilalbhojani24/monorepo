import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allProjects: [],
  showAddProjectModal: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    updateProjects: (state, { payload }) => {
      state.allProjects = payload;
    },
    setAddProjectModalVisibility: (state, { payload }) => {
      state.showAddProjectModal = payload;
    },
  },
});

export const { updateProjects, setAddProjectModalVisibility } =
  projectSlice.actions;
export default projectSlice.reducer;
