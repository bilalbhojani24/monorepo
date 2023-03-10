import { configureStore } from '@reduxjs/toolkit';

import { dashboardReducer } from './features/Dashboard';
import { homeReducer } from './features/Home';
import {
  loadingStateForNewPerformanceSessionReducer,
  newPerformanceSessionReducer
} from './features/NewPerformanceSession';
import { reportReducer } from './features/Report';
import { reportLoadingReducer } from './features/ReportLoading';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    loadingStateForNewPerformanceSession:
      loadingStateForNewPerformanceSessionReducer,
    newPerformanceSession: newPerformanceSessionReducer,
    home: homeReducer,
    reportLoading: reportLoadingReducer,
    report: reportReducer
  }
});

// only enable in dev mode
if (IS_DEV) {
  window.mcpDevRefs = {
    store,
    redirectToPath: (path) => {
      window.location.href = `http://localhost:2099/${path || 'main_window'}`;
    }
  };
}
