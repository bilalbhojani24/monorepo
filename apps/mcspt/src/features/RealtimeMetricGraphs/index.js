import RealtimeMetricGraphs from './components/RealtimeMetricGraphs';
import realtimeMetricsReducer, {
  getCPURealtimeData,
  updateRealTimeGraph
} from './slices/realtimeMetricSlice';

export { getCPURealtimeData, updateRealTimeGraph, realtimeMetricsReducer };

export default RealtimeMetricGraphs;
