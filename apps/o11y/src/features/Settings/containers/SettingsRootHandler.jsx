import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getActiveProject } from 'globalSlice/selectors';
import { getSettingsPath } from 'utils/routeUtils';

function SettingsRootHandler() {
  const activeProject = useSelector(getActiveProject);

  return (
    <Navigate to={getSettingsPath(activeProject?.normalisedName)} replace />
  );
}

export default SettingsRootHandler;
