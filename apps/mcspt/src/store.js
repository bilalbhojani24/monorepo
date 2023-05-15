import { reportReducer } from '@browserstack/mcp-shared';
import { configureStore } from '@reduxjs/toolkit';
import { reportHeaderReducer } from 'features/ReportHeader';

import { authWallReducer } from './features/AuthWall';
import { dashboardReducer } from './features/Dashboard';
import {
  loadingStateForNewPerformanceSessionReducer,
  newPerformanceSessionReducer
} from './features/Home';
import { reportLoadingReducer } from './features/ReportLoading';
import { testHistoryReducer } from './features/TestHistory';

export const store = configureStore({
  reducer: {
    authWall: authWallReducer,
    dashboard: dashboardReducer,
    loadingStateForNewPerformanceSession:
      loadingStateForNewPerformanceSessionReducer,
    newPerformanceSession: newPerformanceSessionReducer,
    testHistory: testHistoryReducer,
    reportLoading: reportLoadingReducer,
    reportHeader: reportHeaderReducer,
    report: reportReducer
  }
});

// only enable in dev mode
if (IS_DEV || !IS_PROD) {
  window.mcpDevRefs = {
    store,
    redirectToPath: (path) => {
      window.location.href = `http://localhost:2099/main_window/#${path || ''}`;
    }
  };
}
