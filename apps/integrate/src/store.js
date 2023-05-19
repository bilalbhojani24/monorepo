import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './features/Layout/slices/headerSlice';
import {
  configurationsReducers,
  integrationsReducers,
  requestCountReducers,
  usageSummaryReducers
} from './globalSlice';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    integrations: integrationsReducers,
    configurations: configurationsReducers,
    requestCount: requestCountReducers,
    usageSummary: usageSummaryReducers
  }
});
