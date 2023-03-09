import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'modalToShow';

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    version: '',
    data: {}
  },
  reducers: {
    toggleModal: (state, { payload }) => {
      state.version = payload.version;
      state.data = payload.data;
    }
  }
});

export const { toggleModal } = actions;

export default reducer;
