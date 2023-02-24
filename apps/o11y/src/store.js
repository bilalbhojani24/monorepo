import { configureStore } from '@reduxjs/toolkit';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

import counterReducer from './features/Counter/slices/counterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer, global: globalReducer },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    if (import.meta.env.DEV) {
      middleware.push(createLogger({ diff: true, collapsed: true }));
    }
    return middleware;
  }
});
