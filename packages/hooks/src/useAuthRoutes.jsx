import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { responseInterceptor } from '@browserstack/utils';

import useMountEffect from './useMountEffect';

const RedirectToLoginComponent = ({ url }) => {
  useMountEffect(() => {
    window.location.href = url;
  }, []);

  return null;
};

responseInterceptor();

const useAuthRoutes = (routes, initAPI, fallbackUrl = '/') => {
  const [loggedIn, setLoggedIn] = useState(null);

  const initAPIcb = useCallback(() => initAPI(), [initAPI]);

  useEffect(() => {
    (async () => {
      try {
        const response = await initAPIcb();
        if (response) {
          setLoggedIn(true);
          document.getElementById('root-loader').style.display = 'none';
          document.getElementById('root').style.display = 'block';
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        setLoggedIn(false);
      }
    })();
  }, [initAPIcb]);

  const routeElement = useMemo(() => {
    const getComponent = (r) => {
      if (loggedIn === null) return null;
      if (!r.isProtected || (r.isProtected && loggedIn)) return r.component;
      return <RedirectToLoginComponent url={fallbackUrl} />;
    };

    return routes.map((r) => ({
      element: r.component ? getComponent(r) : <Outlet />,
      path: r.path,
      ...(r.children && {
        children: r.children.map((rChild) => ({
          element: getComponent(rChild),
          path: rChild.path
        }))
      })
    }));
  }, [loggedIn, routes, fallbackUrl]);

  return useRoutes(routeElement);
};

export default useAuthRoutes;
