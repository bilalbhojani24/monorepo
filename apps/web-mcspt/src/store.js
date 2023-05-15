import { reportReducer } from '@browserstack/mcp-shared';
import { configureStore } from '@reduxjs/toolkit';

import { homeReducer } from './features/Home';

export const store = configureStore({
  reducer: { home: homeReducer, report: reportReducer }
});

// only enable in dev mode
if (IS_DEV || !IS_PROD) {
  window.mcpDevRefs = {
    store
  };
}
