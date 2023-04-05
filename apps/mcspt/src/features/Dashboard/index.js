import Dashboard from './components/Dashboard';
import RouteWithoutSidebarWrapper from './components/RouteWithoutSidebarWrapper';
import Sidebar from './components/Sidebar';
import dashboardReducer, {
  getAuthToken,
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getTotalCompletedSessions,
  getUserData
} from './slices/dashboardSlice';
import { logUserOutAndPurgeSessionData } from './slices/dashboardThunks';

export {
  dashboardReducer,
  getAuthToken,
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getTotalCompletedSessions,
  getUserData,
  logUserOutAndPurgeSessionData,
  RouteWithoutSidebarWrapper,
  Sidebar
};

export default Dashboard;
