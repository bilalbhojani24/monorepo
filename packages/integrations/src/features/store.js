import { configureStore } from '@reduxjs/toolkit';

import integrationsReducer from './slices/integrationsSlice';

export const reducers = {
  integrations: integrationsReducer
};
export const store = configureStore({
  reducer: reducers
});
