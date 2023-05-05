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
import {
  checkAuthAndSaveUserDetails,
  logUserOutAndPurgeSessionData
} from './slices/dashboardThunks';

export {
  checkAuthAndSaveUserDetails,
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
