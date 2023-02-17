import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import importCSVReducer from 'features/importCSVFlow/slices/importCSVSlice';
import dashboardReducer from 'features/Dashboard/slices/dashboardSlice';
import projectReducer from 'features/Projects/slices/projectSlice';
import importReducer from 'features/quickImportFlow/slices/importSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import testCaseDetailsReducer from 'features/TestCaseDetailsView/slices/testCaseDetailsSlice';
import testRunsReducer from 'features/TestRuns/slices/testRunsSlice';
import globalReducer from 'globalSlice';

const middleware = getDefaultMiddleware({ serializableCheck: false });

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
    testRuns: testRunsReducer,
    testCaseDetails: testCaseDetailsReducer,
    import: importReducer,
    importCSV: importCSVReducer,
    dashboard: dashboardReducer
  },
  middleware
});
