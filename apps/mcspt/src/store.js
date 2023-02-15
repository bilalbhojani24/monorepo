import { configureStore } from '@reduxjs/toolkit';

import { homeReducer } from './features/Home';
import { newPerformanceSessionReducer } from './features/NewPerformanceSession';
import { reportLoadingReducer } from './features/ReportLoading';

export const store = configureStore({
  reducer: {
    newPerformanceSession: newPerformanceSessionReducer,
    home: homeReducer,
    reportLoading: reportLoadingReducer
  }
});

// only enable in dev mode
if (IS_DEV) {
  window.mcpDevRefs = {
    store,
    redirectToMain: () => {
      window.location.href = 'http://localhost:2099/main_window';
    }
  };
}
