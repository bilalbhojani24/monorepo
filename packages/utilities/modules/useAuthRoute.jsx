import React, { useMemo, useState, useEffect } from "react";
// import { Outlet, useRoutes } from 'react-router-dom';
import * as ReactRouter from "react-router-dom";

const useAuthRoutes = (routes) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // API call for auth
    setLoggedIn(true);
  }, []);

  const routeElement = useMemo(() => {
    const getComponent = (r) => {
      if (loggedIn !== null && (!r.isProtected || (r.isProtected && loggedIn)))
        return r.component;
      return null;
    };

    const getElement = (r) => {
      if (r.component) return getComponent(r);
      return <ReactRouter.Outlet />;
    };

    return routes.map((r) => ({
      element: getElement(r),
      path: r.path,
      ...(r.children && {
        children: r.children.map((rChild) => ({
          element: getComponent(rChild),
          path: rChild.path,
        })),
      }),
    }));
  }, [loggedIn, routes]);

  return ReactRouter.useRoutes(routeElement);
};

export default useAuthRoutes;
