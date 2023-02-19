import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';

import Dashboard from './Dashboard';

const LayoutWSidebar = () => (
  <Suspense
    fallback={
      <O11yLoader
        wrapperClassName="h-full"
        loaderClass="text-base-200 fill-base-400 w-8 h-8"
      />
    }
  >
    <Dashboard>
      <Outlet />
    </Dashboard>
  </Suspense>
);

export default LayoutWSidebar;
