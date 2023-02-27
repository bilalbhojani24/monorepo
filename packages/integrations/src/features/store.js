import { configureStore } from '@reduxjs/toolkit';

import integrationsReducer from './slices/integrationsSlice';

export const store = configureStore({
  reducer: {
    lookingFor: integrationsReducer
  }
});
