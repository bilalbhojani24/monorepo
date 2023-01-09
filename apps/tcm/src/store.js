import { configureStore } from '@reduxjs/toolkit';
import repositoryReducer from 'features/Repository/slices/repositorySlice';
import globalReducer from 'globalSlice/globalSlice';

import counterReducer from './features/Counter/slices/counterSlice';

export const store = configureStore({
  reducer: { repository: repositoryReducer, global: globalReducer },
});
