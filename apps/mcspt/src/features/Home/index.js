import Home from './components/Home';
import loadingStateForNewPerformanceSessionReducer from './slices/loadingStateForNewPerformanceSession';
import newPerformanceSessionReducer, {
  getDeviceOfNewPerformanceSession,
  getListOfDevices,
  getSelectedApplication,
  getSelectedDevice,
  getSessionDetails,
  resetSessionSetupData
} from './slices/newPerformanceSessionSlice';
import { fetchConnectedDevices } from './slices/newPerformanceSessionThunks';

export {
  fetchConnectedDevices,
  getDeviceOfNewPerformanceSession,
  getListOfDevices,
  getSelectedApplication,
  getSelectedDevice,
  getSessionDetails,
  loadingStateForNewPerformanceSessionReducer,
  newPerformanceSessionReducer,
  resetSessionSetupData
};

export default Home;
