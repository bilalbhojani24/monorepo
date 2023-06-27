import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridConsole';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    clustersData: [],
    gridsData: []
  },
  reducers: {
    setClusterData: (state, { payload }) => {
      const { clusterData } = payload;

      state.clustersData = clusterData;
    },
    setGridData: (state, { payload }) => {
      const { gridData } = payload;

      state.gridsData = gridData;
    }
  }
});

export const { setClusterData, setGridData } = actions;
export default reducer;
