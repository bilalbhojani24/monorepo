import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import O11yLoader from 'common/O11yLoader';
import O11yTopContent from 'common/O11yTopContent';
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
    <>
      <O11yTopContent />
      <Suspense fallback={<O11yLoader wrapperClassName="h-screen" />}>
        <main className="flex">
          <Outlet />
        </main>
      </Suspense>
      <NotificationsContainer />
    </>
  );
}
