import { createSlice } from '@reduxjs/toolkit';

const SLICE_NAME = 'gridConsole';

const { actions, reducer } = createSlice({
  name: SLICE_NAME,
  initialState: {
    clustersData: [],
    gridsData: [],
    selectedCluserData: {},
    selectedGridData: {}
  },
  reducers: {
    resetSelectedClusterData: (state) => {
      state.selectedCluserData = {};
    },
    resetSelectedGridData: (state) => {
      state.selectedGridData = {};
    },
    setSelectedClusterData: (state, { payload }) => {
      const clusterData = payload;
      state.selectedCluserData = clusterData;
    },
    setSelectedGridData: (state, { payload }) => {
      const gridData = payload;
      state.selectedGridData = gridData;
    },
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

export const {
  resetSelectedClusterData,
  resetSelectedGridData,
  setSelectedClusterData,
  setSelectedGridData,
  setClusterData,
  setGridData
} = actions;
export default reducer;
