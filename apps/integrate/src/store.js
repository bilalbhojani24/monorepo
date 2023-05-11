import { configureStore } from '@reduxjs/toolkit';

import headerReducer from './features/Layout/slices/headerSlice';

export const store = configureStore({
  reducer: { header: headerReducer }
});
