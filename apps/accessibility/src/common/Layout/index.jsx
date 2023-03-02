import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuthRoutes } from '@browserstack/hooks';
// import fetchAuth from 'api/auth';
import initAPICall from 'api/initAPI';
import { APP_ROUTES } from 'constants/routes';
import { setUser } from 'features/Dashboard/slices/appSlice';

const App = () => {
  const dispatch = useDispatch();

  const initAPI = async () =>
    initAPICall().then(
      (response) =>
        console.log(response) || dispatch(setUser(response.data.data))
    );

  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    'https://accessibility.bsstag.com/api/v1/auth/start-sso'
  );

  return <>{Routes}</>;
};

export default App;
