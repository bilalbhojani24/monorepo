import React from 'react';
import { useAuthRoutes } from '@browserstack/hooks';
import axios from 'axios';

import { APP_ROUTES } from './constants/routesConstants';

const initAPI = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve(false);
    }, 2000);
  });

  // returns status code - 200 (uncomment and test)
  return axios.get(
    'https://run.mocky.io/v3/ae5ce0d2-cecc-4580-8bdb-a91cd9d8db94'
  );

  // returns status code - 401 (uncomment and test)
  // return axios.get(
  //   'https://run.mocky.io/v3/a1656866-98fe-49cd-9b97-1163c2866b48'
  // );
};

const App = () => {
  const Routes = useAuthRoutes(APP_ROUTES, initAPI, '/login');

  return <>{Routes}</>;
};

export default App;
