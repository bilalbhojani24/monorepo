import React, { Suspense, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { useResizeObserver } from '@browserstack/hooks';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import O11yTopBanner from 'common/O11yTopBanner';
import { ROUTES } from 'constants/routes';
import IntegrationsWidget from 'features/IntegrationsWidget';
import Sidebar from 'features/Sidebar';
import { getInitData, getProjects } from 'globalSlice/selectors';

import { AppContext } from '../context/AppContext';

const LayoutWSidebar = () => {
  const headerRef = useRef(null);
  const headerSize = useResizeObserver(headerRef);
  const projects = useSelector(getProjects);
  const initData = useSelector(getInitData);
  const widgetPositionRef = useRef(null);

  const setWidgetPositionRef = useCallback((ref) => {
    widgetPositionRef.current = ref;
  }, []);

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
    <AppContext.Provider
      value={{
        widgetPositionRef,
        setWidgetPositionRef,
        headerSize
      }}
    >
      <>
        <div id="o11y-header" className="sticky top-0 z-10" ref={headerRef}>
          <O11yHeader />
          <O11yTopBanner />
        </div>
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
    </AppContext.Provider>
  );
};
export default LayoutWSidebar;
