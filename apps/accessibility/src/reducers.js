import dashboard from 'features/Dashboard/slices/uiSlice';
import reportApp from 'features/Report/slice/appSlice';
import reportData from 'features/Report/slice/dataSlice';
import reportsApp from 'features/Reports/slices/appSlice';
import { combineReducers } from 'redux';

// App Reducers
const app = combineReducers({
  reports: reportsApp,
  report: reportApp
});

// Data Reducers
const data = combineReducers({
  report: reportData
});

// UI Reducers
const ui = combineReducers({
  dashboard
});

const accessibilityReducers = combineReducers({ ui, app, data });

export default combineReducers({
  accessibility: accessibilityReducers
});
