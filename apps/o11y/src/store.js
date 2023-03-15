import { configureStore } from '@reduxjs/toolkit';
import modalToShow from 'common/ModalToShow/slices/modalToShowSlice';
import buildsReducer from 'features/AllBuilds/slices/dataSlice';
import settingsReducer from 'features/Settings/slices/settingsSlice';
import shErrorDetailsReducer from 'features/SHErrorDetails/slices/dataSlice';
import shTestDetailsReducer from 'features/SHTestDetails/slices/dataSlice';
import shTestsReducer from 'features/SuiteHealth/slices/dataSlice';
import testDetailsDataReducer from 'features/TestDetails/slices/dataSlice';
import testDetailsUIReducer from 'features/TestDetails/slices/uiSlice';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    settings: settingsReducer,
    shTests: shTestsReducer,
    shTestdetails: shTestDetailsReducer,
    shErrordetails: shErrorDetailsReducer,
    testdetails: testDetailsDataReducer,
    testdetailsui: testDetailsUIReducer,
    buildsData: buildsReducer,
    modalToShow
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    if (import.meta.env.DEV) {
      middleware.push(createLogger({ diff: true, collapsed: true }));
    }
    return middleware;
  }
});
