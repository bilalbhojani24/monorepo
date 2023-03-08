import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthRoutes } from '@browserstack/hooks';
import initAPICall from 'api/initAPI';
import { APP_ROUTES } from 'constants/routes';
import { setUser } from 'features/Dashboard/slices/appSlice';
import { getEnvUrl } from 'utils';

const App = () => {
  const dispatch = useDispatch();

  const initAPI = async () =>
    initAPICall().then((response) => dispatch(setUser(response.data.data)));

  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    `${getEnvUrl}/api/v1/auth/start-sso?redirection_url=${window.location.href}`
  );

  return <>{Routes}</>;
};

export default App;
