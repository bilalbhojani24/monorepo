import { configureStore } from '@reduxjs/toolkit';

import createGridReducer from './features/CreateGrid/slices/index';
import gridConsoleReducer from './features/GridConsole/slices/index';
import globalReducer from './globalSlice/index';

export const store = configureStore({
  reducer: {
    createGrid: createGridReducer,
    global: globalReducer,
    gridConsole: gridConsoleReducer
  }
});
