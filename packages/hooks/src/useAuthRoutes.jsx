import React, { useEffect, useMemo, useState } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { responseInterceptor } from '@browserstack/utils';

const RedirectComponent = () => {
  useEffect(() => {
    window.location.href = '/login';
  }, []);
  return null;
};

responseInterceptor();

const useAuthRoutes = (routes, initAPI) => {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await initAPI();
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
  }, [initAPI]);

  const routeElement = useMemo(() => {
    const getComponent = (r) => {
      if (loggedIn === null) return null;
      if (!r.isProtected || (r.isProtected && loggedIn)) return r.component;
      return <RedirectComponent />;
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
  }, [loggedIn, routes]);

  return useRoutes(routeElement);
};

export default useAuthRoutes;
