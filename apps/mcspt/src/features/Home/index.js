import Home from './components/Home';
import loadingStateForNewPerformanceSessionReducer from './slices/loadingStateForNewPerformanceSession';
import newPerformanceSessionReducer, {
  getListOfDevices,
  getSelectedDevice,
  getSessionDetails,
  resetSessionSetupData
} from './slices/newPerformanceSessionSlice';
import { fetchConnectedDevices } from './slices/newPerformanceSessionThunks';

export {
  fetchConnectedDevices,
  getListOfDevices,
  getSelectedDevice,
  getSessionDetails,
  loadingStateForNewPerformanceSessionReducer,
  newPerformanceSessionReducer,
  resetSessionSetupData
};

export default Home;
