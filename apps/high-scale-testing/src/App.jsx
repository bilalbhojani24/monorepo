import React from 'react';
import axios from 'axios';

import { INIT_URL } from './constants/apiURLs';
import env from './constants/envConstants';
import { APP_ROUTES } from './constants/routesConstants';
import useAuthRoutes from './hooks/useAuthRoutes';

const initAPI = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 3000);
  });

  // returns status code - 200 (uncomment and test)
  return axios.get(INIT_URL);

  // returns status code - 401 (uncomment and test)
  // return axios.get(
  //   'https://run.mocky.io/v3/a1656866-98fe-49cd-9b97-1163c2866b48'
  // );
};

const App = () => {
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'http://localhost:5000/api/v1/auth/start-sso?redirect_url=https://high-scale-testing-local.bsstag.com'
  );

  // eslint-disable-next-line no-console
  console.log('Log:', env);

  return <>{Routes}</>;
};

export default App;
