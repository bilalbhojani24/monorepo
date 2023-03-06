import React, { useMemo, useState } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import { useMountEffect } from '@browserstack/hooks';
import { responseInterceptor } from '@browserstack/utils';

const useAuthRoutes = (routes, initAPI, fallbackUrl) => {
  const [loggedIn, setLoggedIn] = useState(null);

  useMountEffect(() => {
    responseInterceptor(fallbackUrl);
  });

  useMountEffect(() => {
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
  });

  const routeElement = useMemo(() => {
    const getComponent = (r) => {
      if (loggedIn !== null && (!r.isProtected || (r.isProtected && loggedIn)))
        return r.component;
      return null;
    };

    const getChildren = (r) => {
      if (!r.children) return [];
      return {
        children: r.children.map((rChild) => ({
          element: getComponent(rChild),
          path: rChild.path,
          ...getChildren(rChild)
        }))
      };
    };

    return routes.map((r) => ({
      element: r.component ? getComponent(r) : <Outlet />,
      path: r.path,
      ...getChildren(r)
    }));
  }, [loggedIn, routes]);

  return useRoutes(routeElement);
};

export default useAuthRoutes;
