import React from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import { INIT_URL, SSO_URL } from './constants/apiURLs';
import env from './constants/envConstants';
import { APP_ROUTES } from './constants/routesConstants';
import useAuthRoutes from './hooks/useAuthRoutes';
import { initialiseApplication } from './globalSlice';

const App = () => {
  const dispatch = useDispatch();

  const initAPI = async () => {
    const response = await axios.get(INIT_URL);

    dispatch(initialiseApplication(response.data));

    return response;
  };

  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    `${SSO_URL}?redirect_url=${window.location.href}`
  );

  // eslint-disable-next-line no-console
  console.log('Log:', env);

  return <>{Routes}</>;
};

export default App;
