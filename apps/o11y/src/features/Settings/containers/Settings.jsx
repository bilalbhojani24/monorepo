import React, { Suspense, useContext, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { AppContext } from 'features/Layout/context/AppContext';
import { logOllyEvent } from 'utils/common';

import SettingsSidebar from '../components/SettingsSidebar';

export default function Settings() {
  const { pathname } = useLocation();
  const { headerSize } = useContext(AppContext);

  useEffect(() => {
    logOllyEvent({ event: 'O11ySettingsPageVisited' });
  }, [pathname]);

  return (
    <div
      className="flex h-screen flex-col"
      style={{
        height: `calc(100vh - ${headerSize.blockSize}px)`
      }}
    >
      <header className="border-b-base-200 sticky top-16 border-b p-6">
        <h1 className="text-2xl font-bold leading-7">Settings</h1>
      </header>
      <section className="flex flex-1 items-start overflow-auto p-6">
        <SettingsSidebar />
        <Suspense
          fallback={<O11yLoader wrapperClassName="h-screen w-auto flex-1" />}
        >
          <Outlet />
        </Suspense>
      </section>
    </div>
  );
}
