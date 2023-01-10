import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  showAddProjectModal: false,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setAddProjectModalVisibility: (state, { payload }) => {
      state.showAddProjectModal = payload;
    },
  },
});

export const { setAddProjectModalVisibility } = projectSlice.actions;
export default projectSlice.reducer;
