import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/Counter/slices/counterSlice';

export const store = configureStore({
  reducer: { counter: counterReducer }
});
