import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/Counter/slices/counterSlice';
import globalReducer from 'globalSlice/globalSlice';

export const store = configureStore({
  reducer: { counter: counterReducer, global: globalReducer }
});
