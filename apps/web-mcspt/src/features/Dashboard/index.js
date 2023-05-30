import Dashboard from './components/Dashboard';
import RootRedirect from './components/RootRedirect';
import dashboardReducer, {
  getAuthToken,
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getUserData
} from './slices/dashboardSlice';

export {
  dashboardReducer,
  getAuthToken,
  getGeneralAnalytics,
  getIsUserLoggedIn,
  getUserData,
  RootRedirect
};

export default Dashboard;
