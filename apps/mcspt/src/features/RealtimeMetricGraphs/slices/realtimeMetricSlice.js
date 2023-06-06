import { createSlice } from '@reduxjs/toolkit';

import { GRAPH_EVENT_MAP } from '../utils/realtimeGraphUtils';

const initialState = {
  CPU_REALTIME_GRAPH: [[1, 32.45]],
  MEMORY_REALTIME_GRAPH: []
};

export const realtimeMetricSlice = createSlice({
  name: 'realtimeMetrics',
  initialState,
  reducers: {
    updateRealTimeGraph: (state, action) => {
      const graphToBeUpdated = GRAPH_EVENT_MAP[action.payload?.graphName];

      if (
        graphToBeUpdated &&
        action.payload?.graphTimeStamp !== undefined &&
        action.payload?.graphValue !== undefined
      ) {
        state[graphToBeUpdated].push([
          action.payload?.graphTimeStamp / 1000,
          action.payload?.graphValue
        ]);
      }
    }
  }
});

export const getCPURealtimeData = (state) =>
  state.realtimeMetrics.CPU_REALTIME_GRAPH;

export const getMemoryRealtimeData = (state) =>
  state.realtimeMetrics.MEMORY_REALTIME_GRAPH;

// Action creators are generated for each case reducer function
export const { updateRealTimeGraph } = realtimeMetricSlice.actions;

export default realtimeMetricSlice.reducer;
