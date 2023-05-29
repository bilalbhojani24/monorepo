import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridConsole';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    gridData: {}
  },
  reducers: {
    setGridData: (state, { payload }) => {
      const { gridData } = payload;

      state.gridData = gridData;
    }
  }
});

export const { setGridData } = actions;
export default reducer;
