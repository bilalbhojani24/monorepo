import React from 'react';
import axios from 'axios';

import env from './constants/envConstants';
import { APP_ROUTES } from './constants/routesConstants';
import useAuthRoutes from './hooks/useAuthRoutes';
import { getEnvConfig } from './utils/getEnvConfig';

const envConfig = getEnvConfig();

const initAPI = () => axios.get(`${envConfig?.apiUrl}/api/oauth/status`);

const App = () => {
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    `${envConfig?.apiUrl}/api/oauth/login`
  );

  // kept for usasge reference
  // eslint-disable-next-line no-console
  console.log(env.BSTACK_DEMO);
  // eslint-disable-next-line no-console
  console.log(env);

  return <>{Routes}</>;
};

export default App;
