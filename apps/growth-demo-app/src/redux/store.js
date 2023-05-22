import { reducers as growthReducers } from '@browserstack/growth';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  ...growthReducers
});

export const store = configureStore({
  reducer: rootReducers
});
