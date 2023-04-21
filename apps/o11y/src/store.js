import { configureStore } from '@reduxjs/toolkit';
import modalToShow from 'common/ModalToShow/slices/modalToShowSlice';
import buildsReducer from 'features/AllBuilds/slices/dataSlice';
import buildDetailsReducer from 'features/BuildDetails/slices/buildDetailsSlice';
import integrationsReducer from 'features/Integrations/slices/integrationsSlice';
import integrationsWidgetReducer from 'features/IntegrationsWidget/slices/integrationsWidgetSlice';
import alertsSettingsReducer from 'features/Settings/slices/alertsSettings';
import autoAnalyserSettingsReducer from 'features/Settings/slices/autoAnalyserSettings';
import failureCategoriesSettingsReducer from 'features/Settings/slices/failureCategoriesSettings';
import generalSettingsReducer from 'features/Settings/slices/generalSettings';
import notificationsSettingsReducer from 'features/Settings/slices/notificationsSettings';
import reRunSettingsReducer from 'features/Settings/slices/reRunSettings';
import shErrorDetailsReducer from 'features/SHErrorDetails/slices/dataSlice';
import shTestDetailsReducer from 'features/SHTestDetails/slices/dataSlice';
import shTestsReducer from 'features/SuiteHealth/slices/dataSlice';
import suiteHealthUIReducer from 'features/SuiteHealth/slices/uiSlice';
import testDetailsDataReducer from 'features/TestDetails/slices/dataSlice';
import testDetailsUIReducer from 'features/TestDetails/slices/uiSlice';
import testingTrendReducer from 'features/TestingTrends/slices/testingTrendsSlice';
import testListReducer from 'features/TestList/slices/testListSlice';
import testInsightsSlice from 'features/TestsInsights/slices/testInsightsSlice';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    alertSettings: alertsSettingsReducer,
    autoAnalyserSettings: autoAnalyserSettingsReducer,
    buildDetails: buildDetailsReducer,
    buildsData: buildsReducer,
    failureCategoriesSettings: failureCategoriesSettingsReducer,
    generalSettings: generalSettingsReducer,
    global: globalReducer,
    integrations: integrationsReducer,
    integrationsWidget: integrationsWidgetReducer,
    modalToShow,
    reRunSettings: reRunSettingsReducer,
    notificationsSettings: notificationsSettingsReducer,
    shErrordetails: shErrorDetailsReducer,
    shTestdetails: shTestDetailsReducer,
    shTests: shTestsReducer,
    suiteHealthUI: suiteHealthUIReducer,
    testList: testListReducer,
    testdetails: testDetailsDataReducer,
    testdetailsui: testDetailsUIReducer,
    testingTrend: testingTrendReducer,
    testInsights: testInsightsSlice
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    if (import.meta.env.DEV) {
      middleware.push(createLogger({ diff: true, collapsed: true }));
    }
    return middleware;
  }
});
