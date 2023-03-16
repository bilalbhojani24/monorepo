import Dashboard from './components/Dashboard';
import RouteWithoutSidebarWrapper from './components/RouteWithoutSidebarWrapper';
import Sidebar from './components/Sidebar';
import dashboardReducer, {
  getAuthToken,
  getIsUserLoggedIn,
  getUserData
} from './slices/dashboardSlice';
import { logUserOutAndPurgeSessionData } from './slices/dashboardThunks';

export {
  dashboardReducer,
  getAuthToken,
  getIsUserLoggedIn,
  getUserData,
  logUserOutAndPurgeSessionData,
  RouteWithoutSidebarWrapper,
  Sidebar
};

export default Dashboard;
