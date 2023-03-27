import { configureStore } from '@reduxjs/toolkit';

import configReducers from '../common/slices/configSlice';
import globalAlertReducers from '../common/slices/globalAlertSlice';

import integrationsReducers from './slices/integrationsSlice';
import projectsReducers from './slices/projectsSlice';
import toolAuthRedducers from './slices/toolAuthSlice';
import userAuthReducers from './slices/userAuthSlice';

export const reducers = {
  projects: projectsReducers,
  integrations: integrationsReducers,
  userAuth: userAuthReducers,
  toolAuth: toolAuthRedducers,
  globalAlert: globalAlertReducers,
  config: configReducers
};
export const store = configureStore({
  reducer: reducers
});
