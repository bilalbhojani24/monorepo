import { configureStore } from '@reduxjs/toolkit';

import createGridReducer from './features/CreateGrid/slices/index';
import gridConsoleReducer from './features/GridConsole/slices/index';
import gridDetailReducer from './features/GridDetail/slices/index';
import gridSetupReducer from './features/Setup/slices';
import globalReducer from './globalSlice/index';

export const store = configureStore({
  reducer: {
    createGrid: createGridReducer,
    global: globalReducer,
    gridConsole: gridConsoleReducer,
    gridDetail: gridDetailReducer,
    gridSetup: gridSetupReducer
  }
});
