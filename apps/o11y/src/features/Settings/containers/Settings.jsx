import React, { Suspense, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import O11yLoader from 'common/O11yLoader';
import { WRAPPER_GAP_CLASS } from 'constants/common';
import { logOllyEvent } from 'utils/common';

import SettingsSidebar from '../components/SettingsSidebar';

export default function Settings() {
  const { pathname } = useLocation();
  useEffect(() => {
    logOllyEvent({ event: 'O11ySettingsPageVisited' });
  }, [pathname]);

  return (
    <div className={twClassNames('flex h-screen flex-col', WRAPPER_GAP_CLASS)}>
      <header className="border-b-base-200 sticky top-16 border-b py-6 px-8">
        <h1 className="text-2xl font-bold leading-7">Settings</h1>
      </header>
      <section className="flex flex-1 items-start overflow-auto p-8">
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
