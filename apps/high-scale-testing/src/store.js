import { configureStore } from '@reduxjs/toolkit';

import globalReducer from './globalSlice/index';

export const store = configureStore({
  reducer: { global: globalReducer }
});
