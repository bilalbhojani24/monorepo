import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';
import { getInitData } from 'globalSlice/selectors';

export default function LayoutWOSidebar() {
  const initData = useSelector(getInitData);
  const location = useLocation();
  const matchReqAccessData = matchPath(
    {
      path: ROUTES.request_access
    },
    location.pathname
  );
  const matchNoAccessData = matchPath(
    {
      path: ROUTES.no_access
    },
    location.pathname
  );

  if (!initData.isLoading && !matchNoAccessData && !initData.data?.hasAccess) {
    return <Navigate to={ROUTES.no_access} />;
  }

  if (
    !initData.isLoading &&
    !matchReqAccessData &&
    initData.data?.hasAccess &&
    !initData.data?.hasAcceptedTnC
  ) {
    return <Navigate to={ROUTES.request_access} />;
  }

  return (
    <>
      <Suspense fallback={<O11yLoader wrapperClassName="h-screen" />}>
        <main className="flex">
          <Outlet />
        </main>
      </Suspense>
    </>
  );
}
