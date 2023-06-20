import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import Sidebar from 'features/Sidebar';
import { getInitData, getProjects } from 'globalSlice/selectors';

const LayoutWSidebar = () => {
  const projects = useSelector(getProjects);
  const initData = useSelector(getInitData);
  if (!initData.isLoading && !initData.data?.hasAccess) {
    return <Navigate to={ROUTES.no_access} />;
  }

  if (!initData.isLoading && !initData.data?.hasAcceptedTnC) {
    return <Navigate to={ROUTES.request_access} />;
  }

  if (!projects?.list?.length) {
    return <Navigate to={ROUTES.get_started} />;
  }

  if (!projects.active.normalisedName) {
    return <Navigate to={ROUTES.projects} replace />;
  }

  return (
    <>
      <main className="flex">
        <Sidebar />
        <Suspense fallback={<O11yLoader wrapperClassName="h-screen" />}>
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </Suspense>
      </main>
    </>
  );
};
export default LayoutWSidebar;
