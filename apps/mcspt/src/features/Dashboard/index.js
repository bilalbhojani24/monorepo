import Dashboard from './components/Dashboard';
import RouteWithoutSidebarWrapper from './components/RouteWithoutSidebarWrapper';
import Sidebar from './components/Sidebar';
import dashboardReducer, {
  getAuthToken,
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getTotalAllowedSessions,
  getTotalCompletedSessions,
  getUserData,
  setSessionAuthMetaData
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
  getTotalAllowedSessions,
  getTotalCompletedSessions,
  getUserData,
  logUserOutAndPurgeSessionData,
  RouteWithoutSidebarWrapper,
  setSessionAuthMetaData,
  Sidebar
};

export default Dashboard;
