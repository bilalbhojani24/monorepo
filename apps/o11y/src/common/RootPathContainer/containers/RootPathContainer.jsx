import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getProjects } from 'globalSlice/selectors';

export default function RootPathContainer() {
  const projects = useSelector(getProjects);
  if (projects.isLoading) {
    return <O11yLoader />;
  }
  if (!projects.list.length) {
    return <Navigate to={ROUTES.get_started} />;
  }
  return <Navigate to={ROUTES.projects} />;
}
