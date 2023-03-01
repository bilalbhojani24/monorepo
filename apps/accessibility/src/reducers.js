import dashboard from 'features/Dashboard/slices/uiSlice';
import reportApp from 'features/Report/slice/appSlice';
import reportData from 'features/Report/slice/dataSlice';
import reportsApp from 'features/Reports/slices/appSlice';
import siteScannerData from 'features/SiteScanner/slices/dataSlice';
import { combineReducers } from 'redux';

import siteScannerReport from './features/SiteScanner/ScanReport/slice/appSlice';
// App Reducers
const app = combineReducers({
  reports: reportsApp,
  report: reportApp,
  siteScannerReport
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
