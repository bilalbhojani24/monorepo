import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import importCSVReducer from 'features/importCSVFlow/slices/importCSVSlice';
import projectReducer from 'features/Projects/slices/projectSlice';
import importReducer from 'features/quickImportFlow/slices/importSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import testCaseDetailsReducer from 'features/TestCaseDetailsView/slices/testCaseDetailsSlice';
import testRunsReducer from 'features/TestRuns/slices/testRunsSlice';
import testRunDetailsReducer from 'features/TestRunsDetails/slices/testRunDetailsSlice';
import globalReducer from 'globalSlice';

const middleware = getDefaultMiddleware({ serializableCheck: false });

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
    testRuns: testRunsReducer,
    testRunsDetails: testRunDetailsReducer,
    testCaseDetails: testCaseDetailsReducer,
    import: importReducer,
    importCSV: importCSVReducer
  },
  middleware
});
