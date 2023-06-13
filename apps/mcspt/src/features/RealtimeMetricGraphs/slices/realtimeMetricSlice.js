import { createSlice } from '@reduxjs/toolkit';

import { GRAPH_EVENT_MAP } from '../utils/realtimeGraphUtils';

const initialState = {
  socketConnectionLoading: true,
  socketConnectionFailed: false,
  realtimeThresholds: {},
  CPU_REALTIME_GRAPH: [],
  MEMORY_REALTIME_GRAPH: [],
  FPS_GRAPH: [],
  SLOW_FRAMES_GRAPH: [],
  NETWROK_UPLOAD_GRAPH: [],
  NETWORK_DOWNLOAD_GRAPH: [],
  DISK_READ_GRAPH: [],
  DISK_WRITE_GRAPH: [],
  BATTERY_REALTIME_GRAPH: []
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
    },

    setIsSocketConnectionLoading: (state, action) => {
      state.socketConnectionLoading = action.payload;
    },

    setIsSocketConnectionFailed: (state, action) => {
      state.socketConnectionFailed = action.payload;
    },

    resetRealtimeMetrics: () => initialState
  }
});

export const getCPUTimeSeriesData = (state) =>
  state.realtimeMetrics.CPU_REALTIME_GRAPH;

export const getFPSTimeSeriesData = (state) => state.realtimeMetrics.FPS_GRAPH;

export const getSlowFramesRealtimeData = (state) =>
  state.realtimeMetrics.SLOW_FRAMES_GRAPH;

export const getMemoryTimeSeriesData = (state) =>
  state.realtimeMetrics.MEMORY_REALTIME_GRAPH;

export const getBatteryTimeSeriesData = (state) =>
  state.realtimeMetrics.BATTERY_REALTIME_GRAPH;

export const getDiskReadTimeSeriesData = (state) =>
  state.realtimeMetrics.DISK_READ_GRAPH;

export const getDiskWriteTimeSeriesData = (state) =>
  state.realtimeMetrics.DISK_WRITE_GRAPH;

export const getNetworkUploadTimeSeriesData = (state) =>
  state.realtimeMetrics.NETWROK_UPLOAD_GRAPH;

export const getNetworkDownloadTimeSeriesData = (state) =>
  state.realtimeMetrics.NETWORK_DOWNLOAD_GRAPH;

export const getIsSocketConnectionLoading = (state) =>
  state.realtimeMetrics.socketConnectionLoading;

export const getIsSocketConnectionFailed = (state) =>
  state.realtimeMetrics.socketConnectionFailed;

// Action creators are generated for each case reducer function
export const {
  updateRealTimeGraph,
  setRealtimeThresholds,
  resetRealtimeMetrics,
  setIsSocketConnectionLoading,
  setIsSocketConnectionFailed
} = realtimeMetricSlice.actions;

export default realtimeMetricSlice.reducer;
