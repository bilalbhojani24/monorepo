import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'topBanner';

const { reducer, actions } = createSlice({
  name: SLICE_NAME,
  initialState: {
    version: '',
    data: {}
  },
  reducers: {
    toggleBanner: (state, { payload }) => {
      state.version = payload.version;
      state.data = payload?.data || {};
    }
  }
});

export const { toggleBanner } = actions;

export default reducer;
