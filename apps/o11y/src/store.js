import { configureStore } from '@reduxjs/toolkit';
import settingsReducer from 'features/Settings/slices/settingsSlice';
import snpErrorDetailsUIReducer from 'features/SHErrorDetails/slices/uiSlice';
import snpTestDetailsUIReducer from 'features/SHTestDetails/slices/uiSlice';
import snpTestsReducer from 'features/SuiteHealth/slices/dataSlice';
import snpTabsReducer from 'features/SuiteHealth/slices/uiSlice';
import testDetailsDataReducer from 'features/TestDetails/slices/dataSlice';
import testDetailsUIReducer from 'features/TestDetails/slices/uiSlice';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    settings: settingsReducer,
    snptests: snpTestsReducer,
    snpui: snpTabsReducer,
    snptestdetailsui: snpTestDetailsUIReducer,
    snperrordetailsui: snpErrorDetailsUIReducer,
    testdetails: testDetailsDataReducer,
    testdetailsui: testDetailsUIReducer
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    if (import.meta.env.DEV) {
      middleware.push(createLogger({ diff: true, collapsed: true }));
    }
    return middleware;
  }
});
