import { configureStore } from '@reduxjs/toolkit';

import gridConsoleReducer from './features/GridConsole/slices/index';
import globalReducer from './globalSlice/index';

export const store = configureStore({
  reducer: { global: globalReducer, gridConsole: gridConsoleReducer }
});
