import React from 'react';
import { useAuthRoutes } from '@browserstack/hooks';

import { APP_ROUTES } from './constants/routesConstants';

const initAPI = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, 2000);
  });

const App = () => {
  const Routes = useAuthRoutes(APP_ROUTES, initAPI);

  return <>{Routes}</>;
};

export default App;
