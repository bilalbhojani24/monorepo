import { configureStore } from '@reduxjs/toolkit';
import projectReducer from 'features/Projects/slices/projectSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import testRunsReducer from 'features/TestRuns/slices/testRunsSlice';
import globalReducer from 'globalSlice/globalSlice';

import testCaseFormReducer from './features/Repository/slices/testCaseFormSlice';

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
    testRuns: testRunsReducer,
    testCaseForm: testCaseFormReducer,
  },
});
