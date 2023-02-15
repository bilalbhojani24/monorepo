import dashboard from 'features/dashboard/slices/dashboardUISlice';
import reportApp from 'features/Report/slice/appSlice';
import reportData from 'features/Report/slice/dataSlice';
import reportsApp from 'features/Reports/slices/appSlice';
import siteScannerData from 'features/SiteScanner/slices/dataSlice';
import { combineReducers } from 'redux';

// App Reducers
const app = combineReducers({
  reports: reportsApp,
  report: reportApp
});

// Data Reducers
const data = combineReducers({
  report: reportData,
  siteScanner: siteScannerData
});

// UI Reducers
const ui = combineReducers({
  dashboard
});

const accessibilityReducers = combineReducers({ ui, app, data });

export default combineReducers({
  accessibility: accessibilityReducers
});
