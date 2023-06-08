import React from 'react';
import { SSO_URL } from 'api/constants/apiURLs';
import { APP_ROUTES } from 'constants/routesConstants';
import useApp from 'hooks/useApp';
import useAuthRoutes from 'hooks/useAuthRoutes';

const App = () => {
  const { initAPI } = useApp();

  const Routes = useAuthRoutes(
    APP_ROUTES,
    initAPI,
    `${SSO_URL}?redirect_url=${encodeURIComponent(window.location.href)}`
  );

  return <>{Routes}</>;
};

export default App;
