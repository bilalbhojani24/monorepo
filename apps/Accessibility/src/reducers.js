// UI
// import reportApp from 'app/bsA11y/Report/slice/appSlice';
// Data
// import reportData from 'app/bsA11y/Report/slice/dataSlice';
// App
import dashboard from 'features/dashboard/slices/dashboardUISlice';
import reportsApp from 'features/Reports/slices/reportsAppSlice';
import { combineReducers } from 'redux';

// App Reducers
const app = combineReducers({
  reports: reportsApp
  // report: reportApp
});

// // Data Reducers
// const data = combineReducers({
//   // report: reportData
// });

// UI Reducers
const ui = combineReducers({
  dashboard
});

const accessibilityReducers = combineReducers({ ui, app });

export default combineReducers({
  accessibility: accessibilityReducers
});
