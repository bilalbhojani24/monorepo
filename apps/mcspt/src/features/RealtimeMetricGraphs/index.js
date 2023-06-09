import RealtimeMetricGraphs from './components/RealtimeMetricGraphs';
import realtimeMetricsReducer, {
  getBatteryTimeSeriesData,
  getCPUTimeSeriesData,
  getDiskReadTimeSeriesData,
  getDiskWriteTimeSeriesData,
  getFPSTimeSeriesData,
  getIsSocketConnectionFailed,
  getIsSocketConnectionLoading,
  getMemoryTimeSeriesData,
  getNetworkDownloadTimeSeriesData,
  getNetworkUploadTimeSeriesData,
  getRealtimeThresholds,
  getSlowFramesRealtimeData,
  resetRealtimeMetrics,
  setIsSocketConnectionFailed,
  setIsSocketConnectionLoading,
  setRealtimeThresholds,
  updateRealTimeGraph
} from './slices/realtimeMetricSlice';
import { getRealtimeMetricThresholdsAndSubscribe } from './slices/realtimeMetricThunks';

export {
  getBatteryTimeSeriesData,
  getCPUTimeSeriesData,
  getDiskReadTimeSeriesData,
  getDiskWriteTimeSeriesData,
  getFPSTimeSeriesData,
  getIsSocketConnectionFailed,
  getIsSocketConnectionLoading,
  getMemoryTimeSeriesData,
  getNetworkDownloadTimeSeriesData,
  getNetworkUploadTimeSeriesData,
  getRealtimeMetricThresholdsAndSubscribe,
  getRealtimeThresholds,
  getSlowFramesRealtimeData,
  realtimeMetricsReducer,
  resetRealtimeMetrics,
  setIsSocketConnectionFailed,
  setIsSocketConnectionLoading,
  setRealtimeThresholds,
  updateRealTimeGraph
};

export default RealtimeMetricGraphs;
