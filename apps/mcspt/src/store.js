import { configureStore } from '@reduxjs/toolkit';

import { dashboardReducer } from './features/Dashboard';
import {
  loadingStateForNewPerformanceSessionReducer,
  newPerformanceSessionReducer
} from './features/Home';
import { reportReducer } from './features/Report';
import { reportLoadingReducer } from './features/ReportLoading';
import { testHistoryReducer } from './features/TestHistory';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    loadingStateForNewPerformanceSession:
      loadingStateForNewPerformanceSessionReducer,
    newPerformanceSession: newPerformanceSessionReducer,
    testHistory: testHistoryReducer,
    reportLoading: reportLoadingReducer,
    report: reportReducer
  }
});

// only enable in dev mode
if (IS_DEV) {
  window.mcpDevRefs = {
    store,
    redirectToPath: (path) => {
      window.location.href = `http://localhost:2099/main_window/#${path || ''}`;
    }
  };
}
