import { configureStore } from '@reduxjs/toolkit';

import homeReducer from './features/Home';

export const store = configureStore({
  reducer: { home: homeReducer }
});
