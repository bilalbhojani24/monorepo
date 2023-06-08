import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridConsole';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    clusterData: {},
    gridData: {}
  },
  reducers: {
    setClusterData: (state, { payload }) => {
      const { clusterData } = payload;

      state.clusterData = clusterData;
    },
    setGridData: (state, { payload }) => {
      const { gridData } = payload;

      state.gridData = gridData;
    }
  }
});

export const { setClusterData, setGridData } = actions;
export default reducer;
