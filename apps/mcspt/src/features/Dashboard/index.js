import Dashboard from './components/Dashboard';
import dashboardReducer, {
  getAuthToken,
  getIsUserLoggedIn
} from './slices/dashboardSlice';
import { logUserOutAndPurgeSessionData } from './slices/dashboardThunks';

export {
  dashboardReducer,
  getAuthToken,
  getIsUserLoggedIn,
  logUserOutAndPurgeSessionData
};

export default Dashboard;
