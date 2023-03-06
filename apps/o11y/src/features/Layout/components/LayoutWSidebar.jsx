import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import Sidebar from 'features/Sidebar';
import { getProjects } from 'globalSlice/selectors';

const LayoutWSidebar = () => {
  const projects = useSelector(getProjects);

  if (!projects?.list?.length) {
    return <Navigate to={ROUTES.get_started} />;
  }

  return (
    <>
      <O11yHeader />
      <main className="flex">
        <Sidebar />
        <Suspense
          fallback={
            <O11yLoader
              wrapperClassName="h-full"
              loaderClass="text-base-200 fill-base-400 w-8 h-8"
            />
          }
        >
          <div className="min-h-screen flex-1">
            <Outlet />
          </div>
        </Suspense>
      </main>
    </>
  );
};
export default LayoutWSidebar;
