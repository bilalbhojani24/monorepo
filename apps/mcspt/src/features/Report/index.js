import Report from './components/Report';
import reportReducer, {
  getSessionMetrics,
  updateSessionMetrics
} from './slices/reportSlice';

export { getSessionMetrics, reportReducer, updateSessionMetrics };

export default Report;
