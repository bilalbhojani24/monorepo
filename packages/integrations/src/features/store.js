import { configureStore } from '@reduxjs/toolkit';

import integrationsReducers from './slices/integrationsSlice';
import projectsReducers from './slices/projectsSlice';
import toolAuthRedducer from './slices/toolAuthSlice';
import userAuthReducers from './slices/userAuthSlice';

export const reducers = {
  projects: projectsReducers,
  integrations: integrationsReducers,
  userAuth: userAuthReducers,
  toolAuth: toolAuthRedducer
};
export const store = configureStore({
  reducer: reducers
});
