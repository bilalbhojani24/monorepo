import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getInitData } from 'globalSlice/selectors';

export default function LayoutWOSidebar() {
  const initData = useSelector(getInitData);
  const location = useLocation();
  const matchData = matchPath(
    {
      path: ROUTES.request_access
    },
    location.pathname
  );

  if (!initData.isLoading && !matchData && !initData.data?.hasAcceptedTnC) {
    return <Navigate to={ROUTES.request_access} />;
  }

  return (
    <Suspense fallback={<O11yLoader wrapperClassName="h-screen" />}>
      <O11yHeader />
      <main>
        <Outlet />
      </main>
      <NotificationsContainer />
    </Suspense>
  );
}
