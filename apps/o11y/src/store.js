import { configureStore } from '@reduxjs/toolkit';
import modalToShow from 'common/ModalToShow/slices/modalToShowSlice';
import buildsReducer from 'features/AllBuilds/slices/dataSlice';
import alertsSettingsReducer from 'features/Settings/slices/alertsSettings';
import autoAnalyserSettingsReducer from 'features/Settings/slices/autoAnalyserSettings';
import failureCategoriesSettingsReducer from 'features/Settings/slices/failureCategoriesSettings';
import generalSettingsReducer from 'features/Settings/slices/generalSettings';
import reRunSettingsReducer from 'features/Settings/slices/reRunSettings';
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
