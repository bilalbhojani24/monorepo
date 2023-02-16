import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import O11yLoader from 'common/O11yLoader';
import { ROUTES } from 'constants/routes';

import Dashboard from './Dashboard';

const Home = lazy(() => import('features/Home'));

const Layout = () => (
  <Suspense
    fallback={
      <O11yLoader
        wrapperClassName="h-full"
        loaderClass="text-base-200 fill-base-400 w-8 h-8"
      />
    }
  >
    <Dashboard>
      <Routes>
        <Route exact path={ROUTES.root} element={<Home />} />
      </Routes>
    </Dashboard>
  </Suspense>
);

export default Layout;
