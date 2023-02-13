import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './features/Counter/slices/counterSlice';
import { homeReducer } from './features/Home';
import { newPerformnceSessionReducer } from './features/NewPerformanceSession';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    newPerformnceSession: newPerformnceSessionReducer,
    home: homeReducer
  }
});

// only enable in dev mode
window.store = store;
