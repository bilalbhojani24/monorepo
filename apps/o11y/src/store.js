import { configureStore } from '@reduxjs/toolkit';
import modalToShow from 'common/ModalToShow/slices/modalToShowSlice';
import buildsReducer from 'features/AllBuilds/slices/dataSlice';
import buildDetailsReducer from 'features/BuildDetails/slices/buildDetailsSlice';
import alertsSettingsReducer from 'features/Settings/slices/alertsSettings';
import autoAnalyserSettingsReducer from 'features/Settings/slices/autoAnalyserSettings';
import failureCategoriesSettingsReducer from 'features/Settings/slices/failureCategoriesSettings';
import generalSettingsReducer from 'features/Settings/slices/generalSettings';
import reRunSettingsReducer from 'features/Settings/slices/reRunSettings';
import shErrorDetailsReducer from 'features/SHErrorDetails/slices/dataSlice';
import shTestDetailsReducer from 'features/SHTestDetails/slices/dataSlice';
import shTestsReducer from 'features/SuiteHealth/slices/dataSlice';
import suiteHealthUIReducer from 'features/SuiteHealth/slices/uiSlice';
import testDetailsDataReducer from 'features/TestDetails/slices/dataSlice';
import testDetailsUIReducer from 'features/TestDetails/slices/uiSlice';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    generalSettings: generalSettingsReducer,
    alertSettings: alertsSettingsReducer,
    autoAnalyserSettings: autoAnalyserSettingsReducer,
    failureCategoriesSettings: failureCategoriesSettingsReducer,
    reRunSettings: reRunSettingsReducer,
    shTests: shTestsReducer,
    suiteHealthUI: suiteHealthUIReducer,
    shTestdetails: shTestDetailsReducer,
    shErrordetails: shErrorDetailsReducer,
    testdetails: testDetailsDataReducer,
    testdetailsui: testDetailsUIReducer,
    buildsData: buildsReducer,
    buildDetails: buildDetailsReducer,
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
