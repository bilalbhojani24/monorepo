import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'createGrid';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    resourceMap: {}
  },
  reducers: {
    setResourceMap: (state, { payload }) => {
      const resourceMap = payload;

      state.resourceMap = resourceMap;
    }
  }
});

export const { setResourceMap } = actions;
export default reducer;
