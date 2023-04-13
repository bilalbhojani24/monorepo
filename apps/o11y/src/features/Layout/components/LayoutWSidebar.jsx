import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import IntegrationsWidget from 'features/IntegrationsWidget';
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
        <Suspense fallback={<O11yLoader wrapperClassName="h-screen" />}>
          <div className="flex flex-1 flex-col">
            <Outlet />
          </div>
        </Suspense>
      </main>
      <IntegrationsWidget />
      <NotificationsContainer />
    </>
  );
};
export default LayoutWSidebar;
