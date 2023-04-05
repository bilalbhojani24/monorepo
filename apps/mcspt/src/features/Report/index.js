import Report from './components/Report';
import useMcpChart from './components/useMcpChart';
import reportReducer, {
  getDevicePlatform,
  getLatestSeekTimeInSeconds,
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  updateLatestVideoCurrentTimeInSeconds,
  updateSessionMetrics
} from './slices/reportSlice';

export {
  getDevicePlatform,
  getLatestSeekTimeInSeconds,
  getLatestVideoCurrentTimeInSeconds,
  getSessionMetrics,
  reportReducer,
  updateLatestVideoCurrentTimeInSeconds,
  updateSessionMetrics,
  useMcpChart
};

export default Report;
