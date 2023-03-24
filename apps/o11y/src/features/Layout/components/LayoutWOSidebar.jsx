import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { NotificationsContainer } from '@browserstack/bifrost';
import { O11yHeader } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';

export default function LayoutWOSidebar() {
  return (
    <Suspense fallback={<O11yLoader wrapperClassName="h-full" />}>
      <O11yHeader />
      <main>
        <Outlet />
      </main>
      <NotificationsContainer />
    </Suspense>
  );
}
