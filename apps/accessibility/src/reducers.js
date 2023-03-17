import dashboardApp from 'features/Dashboard/slices/appSlice';
import dashboardUI from 'features/Dashboard/slices/uiSlice';
import reportApp from 'features/Report/slice/appSlice';
import reportData from 'features/Report/slice/dataSlice';
import reportsApp from 'features/Reports/slices/appSlice';
import siteScannerReportApp from 'features/SiteScanner/ScanReport/slice/appSlice';
import siteScannerReport from 'features/SiteScanner/ScanReport/slice/dataSlice';
import siteScannerData from 'features/SiteScanner/slices/dataSlice';
import { combineReducers } from 'redux';

// App Reducers
// TODO - combine and remove app, data, ui
const app = combineReducers({
  reports: reportsApp,
  report: reportApp,
  siteScannerReportApp,
  dashboard: dashboardApp
});

// Data Reducers
const data = combineReducers({
  report: reportData,
  siteScanner: siteScannerData,
  siteScannerReport
});

// UI Reducers
const ui = combineReducers({
  dashboard: dashboardUI
});

const accessibilityReducers = combineReducers({ ui, app, data });

export default combineReducers({
  accessibility: accessibilityReducers
});
