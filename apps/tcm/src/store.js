import { configureStore } from '@reduxjs/toolkit';
import projectReducer from 'features/Projects/slices/projectSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import testCaseDetailsReducer from 'features/TestCaseDetailsView/slices/testCaseDetailsSlice';
import testRunsReducer from 'features/TestRuns/slices/testRunsSlice';
import globalReducer from 'globalSlice';

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
    testRuns: testRunsReducer,
    testCaseDetails: testCaseDetailsReducer,
  },
});
