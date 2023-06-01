import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { APP_ROUTES } from './constants/routesConstants';
import useAuthRoutes from './hooks/useAuthRoutes';
import { getEnvConfig } from './utils/getEnvConfig';
import { setHasAccess, setNoAccessRedirectPath } from './globalSlice';

const envConfig = getEnvConfig();

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initAPI = () =>
    axios.get(`${envConfig?.apiUrl}/api/oauth/status`).then((res) => {
      if (res?.data) {
        dispatch(setHasAccess(res.data.has_access));
        dispatch(setNoAccessRedirectPath(res.data.redirect_path));
        navigate(res.data.redirect_path);
      }
      return res;
    });
  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    `${envConfig?.apiUrl}/api/oauth/login`
  );

  return <>{Routes}</>;
};

export default App;
