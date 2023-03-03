import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getProjects } from 'globalSlice/selectors';

import Dashboard from './Dashboard';

const LayoutWSidebar = () => {
  const projects = useSelector(getProjects);

  if (!projects?.list?.length) {
    return <Navigate to={ROUTES.get_started} />;
  }

  return (
    <Suspense
      fallback={
        <O11yLoader
          wrapperClassName="h-full"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      }
    >
      <Dashboard>
        <Outlet />
      </Dashboard>
    </Suspense>
  );
};
export default LayoutWSidebar;
