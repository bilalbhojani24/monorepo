import { reportReducer } from '@browserstack/mcp-shared';
import { configureStore } from '@reduxjs/toolkit';

import { dashboardReducer } from './features/Dashboard';
import { reportContainerReducer } from './features/ReportContainer';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    report: reportReducer,
    reportContainer: reportContainerReducer
  }
});

// only enable in dev mode
if (IS_DEV || !IS_PROD) {
  window.mcpDevRefs = {
    store
  };
}
