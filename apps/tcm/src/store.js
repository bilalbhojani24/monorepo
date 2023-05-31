import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from 'features/Dashboard/slices/dashboardSlice';
import importCSVReducer from 'features/importCSVFlow/slices/importCSVSlice';
import onboardingReducer from 'features/Onboarding/slices/onboardingSlice';
import projectReducer from 'features/Projects/slices/projectSlice';
import importReducer from 'features/quickImportFlow/slices/importSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import settingsReducer from 'features/Settings/slices/settingsSlice';
import testCaseDetailsReducer from 'features/TestCaseDetailsView/slices/testCaseDetailsSlice';
import testRunsReducer from 'features/TestRuns/slices/testRunsSlice';
import testRunDetailsReducer from 'features/TestRunsDetails/slices/testRunDetailsSlice';
import globalReducer from 'globalSlice';

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
    testRuns: testRunsReducer,
    testRunsDetails: testRunDetailsReducer,
    testCaseDetails: testCaseDetailsReducer,
    import: importReducer,
    importCSV: importCSVReducer,
    dashboard: dashboardReducer,
    settings: settingsReducer,
    onboarding: onboardingReducer
  }
});
