import React from 'react';
import { useDispatch } from 'react-redux';
import { INIT_URL, SSO_URL } from 'api/constants/apiURLs';
import axios from 'axios';
import { APP_ROUTES } from 'constants/routesConstants';
import { initialiseApplication } from 'globalSlice';
import useAuthRoutes from 'hooks/useAuthRoutes';

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

  return <>{Routes}</>;
};

export default App;
