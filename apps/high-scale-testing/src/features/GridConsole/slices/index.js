import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridConsole';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    gridId: null
  },
  reducers: {
    setGridId: (state, { payload }) => {
      const { gridId } = payload;

      state.gridId = gridId;
    }
  }
});

export const { setGridId } = actions;
export default reducer;
