import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import globalReducer from 'globalSlice';

import counterReducer from './features/Counter/slices/counterSlice';

const middleware = getDefaultMiddleware({ serializableCheck: false });

export const store = configureStore({
  reducer: { counter: counterReducer, global: globalReducer },
  middleware
});
