import { configureStore } from '@reduxjs/toolkit';
import projectReducer from 'features/Projects/slices/projectSlice';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import globalReducer from 'globalSlice/globalSlice';

export const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    global: globalReducer,
    projects: projectReducer,
  },
});
