import React, { Suspense, useRef } from 'react';
import { useSelector } from 'react-redux';
import { matchPath, Navigate, Outlet, useLocation } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import O11yTopBanner from 'common/O11yTopBanner';
import { ROUTES } from 'constants/routes';
import { getInitData } from 'globalSlice/selectors';

import { AppContext } from '../context/AppContext';

export default function LayoutWOSidebar() {
  const initData = useSelector(getInitData);
  const headerRef = useRef(null);
  const headerSize = useResizeObserver(headerRef);
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
      <AppContext.Provider
        value={{
          headerSize
        }}
      >
        <div id="o11y-header" className="sticky top-0 z-10" ref={headerRef}>
          <O11yHeader />
          <O11yTopBanner />
        </div>
        <main>
          <Outlet />
        </main>
        <NotificationsContainer />
      </AppContext.Provider>
    </Suspense>
  );
}
