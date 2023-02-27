import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import { getProjects } from 'globalSlice/selectors';

export default function RootPathContainer() {
  const projects = useSelector(getProjects);
  if (projects.isLoading) {
    return <O11yLoader />;
  }
  if (!projects.list.length) {
    return <EmptyPage text="No Projects Found" />;
  }
  return <Navigate to="/projects" />;
}
