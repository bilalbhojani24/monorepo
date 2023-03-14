import { configureStore } from '@reduxjs/toolkit';
import modalToShow from 'common/ModalToShow/slices/modalToShowSlice';
import settingsReducer from 'features/Settings/slices/settingsSlice';
import buildsReducer from 'features/AllBuilds/slices/dataSlice';
import globalReducer from 'globalSlice';
import { createLogger } from 'redux-logger';

export const store = configureStore({
  reducer: {
    global: globalReducer,
    settings: settingsReducer,
    buildsData: buildsReducer,
    modalToShow
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({ serializableCheck: false });
    if (import.meta.env.DEV) {
      middleware.push(createLogger({ diff: true, collapsed: true }));
    }
    return middleware;
  }
});
