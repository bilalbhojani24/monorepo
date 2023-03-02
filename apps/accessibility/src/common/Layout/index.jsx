import React from 'react';
import { useAuthRoutes } from '@browserstack/hooks';
import fetchAuth from 'api/auth';
import { APP_ROUTES } from 'constants/routes';

const initAPI = async () =>
  fetchAuth().then((response) => console.log('response: ', response));

const App = () => {
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://www.browserstack.com/users/sign_in'
  );

  return <>{Routes}</>;
};

export default App;
