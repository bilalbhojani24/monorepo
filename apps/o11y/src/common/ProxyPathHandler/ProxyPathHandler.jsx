import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { matchRoutes, Navigate, useLocation } from 'react-router-dom';
import { PROXY_PATHS, ROUTES } from 'constants/routes';
import { setActiveProject } from 'globalSlice/index';
import { getActiveProject, getProjects } from 'globalSlice/selectors';
import { getPageUrl, getPageUrlByMapping } from 'utils/routeUtils';

const ROUTES_ARRAY = Object.values(PROXY_PATHS).map((route) => ({
  path: route.path
}));

function ProxyPathHandler() {
  const dispatch = useDispatch();
  const location = useLocation();
  const activeProject = useSelector(getActiveProject);
  const projects = useSelector(getProjects);
  const [
    {
      route: { path }
    }
  ] = matchRoutes(ROUTES_ARRAY, location);
  const matchedKey = useMemo(
    () =>
      Object.keys(PROXY_PATHS).find((key) => PROXY_PATHS[key].path === path),
    [path]
  );

  if (!projects?.list?.length) {
    return <Navigate to={ROUTES.get_started} replace />;
  }

  if (!activeProject.normalisedName) {
    const project = projects.list[0];
    dispatch(
      setActiveProject({
        id: project.value,
        name: project.label,
        normalisedName: project.normalisedName
      })
    );
    return (
      <Navigate
        to={getPageUrlByMapping(
          project.normalisedName,
          `${PROXY_PATHS[matchedKey].key}${location?.search}`
        )}
        replace
      />
    );
  }

  return (
    <Navigate
      to={dispatch(
        getPageUrl(`${PROXY_PATHS[matchedKey].key}${location?.search}`)
      )}
      replace
    />
  );
}

export default ProxyPathHandler;
