import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { reducers } from '../../../../packages/growth/redux/store';

const rootReducers = combineReducers({
  ...reducers
});

export const store = configureStore({
  reducer: rootReducers
});
