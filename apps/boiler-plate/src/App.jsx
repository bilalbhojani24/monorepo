import React from 'react';
import axios from 'axios';

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
  return axios.get(
    'https://run.mocky.io/v3/ae5ce0d2-cecc-4580-8bdb-a91cd9d8db94'
  );

  // returns status code - 401 (uncomment and test)
  // return axios.get(
  //   'https://run.mocky.io/v3/a1656866-98fe-49cd-9b97-1163c2866b48'
  // );
};

const App = () => {
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://www.browserstack.com/users/sign_in'
  );

  // kept for usasge reference
  // eslint-disable-next-line no-console
  console.log(env.BSTACK_DEMO);
  // eslint-disable-next-line no-console
  console.log(env);

  return <>{Routes}</>;
};

export default App;
