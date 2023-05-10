import Report from './components/Report';
import useMcpChart from './components/useMcpChart';
import reportReducer, {
  getDevicePlatform,
  getLatestSeekTimeInSeconds,
  getLatestVideoCurrentTimeInSeconds,
  getPreviousRouteForReport,
  getSessionMetrics,
  setPreviousRouteForReport,
  updateLatestVideoCurrentTimeInSeconds,
  updateSessionMetrics
} from './slices/reportSlice';

export {
  getDevicePlatform,
  getLatestSeekTimeInSeconds,
  getLatestVideoCurrentTimeInSeconds,
  getPreviousRouteForReport,
  getSessionMetrics,
  reportReducer,
  setPreviousRouteForReport,
  updateLatestVideoCurrentTimeInSeconds,
  updateSessionMetrics,
  useMcpChart
};

export default Report;
