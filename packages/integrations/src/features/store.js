import { configureStore } from '@reduxjs/toolkit';

import integrationsReducers from './slices/integrationsSlice';
import toolAuthRedducer from './slices/toolAuthSlice';
import userAuthReducers from './slices/userAuthSlice';

export const reducers = {
  integrations: integrationsReducers,
  userAuth: userAuthReducers,
  toolAuth: toolAuthRedducer
};
export const store = configureStore({
  reducer: reducers
});
