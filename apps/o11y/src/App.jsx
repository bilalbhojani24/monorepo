import React from 'react';
import { useAuthRoutes } from '@browserstack/hooks';
import axios from 'axios';

import { versionedBaseRoute } from './constants/common';
import { APP_ROUTES } from './constants/routesConstants';

const initAPI = () =>
  // await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(false);
  //   }, 2000);
  // });

  // returns status code - 200 (uncomment and test)
  axios.get(`${versionedBaseRoute()}/projects/lite`);

// returns status code - 401 (uncomment and test)
// axios.get('https://run.mocky.io/v3/a1656866-98fe-49cd-9b97-1163c2866b48');
const App = () => {
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://www.browserstack.com/users/sign_in'
  );

  return <>{Routes}</>;
};

export default App;
