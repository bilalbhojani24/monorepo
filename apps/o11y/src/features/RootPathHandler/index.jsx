import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { getActiveProject } from 'globalSlice/selectors';
import { getTestingTrendPath } from 'utils/routeUtils';

function RootPathHandler() {
  const activeProject = useSelector(getActiveProject);
  if (!activeProject.normalisedName) {
    return <Navigate to={ROUTES.projects} replace />;
  }
  return (
    <Navigate to={getTestingTrendPath(activeProject.normalisedName)} replace />
  );
}

export default RootPathHandler;
