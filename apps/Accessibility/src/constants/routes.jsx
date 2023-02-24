import React, { lazy, Suspense } from 'react';
import Home from 'common/Home';
import Loader from 'common/Loader';
import { ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';

const Report = lazy(() => import('features/Report'));
const Reports = lazy(() => import('features/Reports'));
const ScreenReader = lazy(() => import('features/ScreenReader'));

const Layout = (Component) => (
  <Suspense fallback={<Loader />}>
    <Dashboard>
      <Component />
    </Dashboard>
  </Suspense>
);

export const APP_ROUTES = [
  {
    path: ROUTES.root,
    component: <Home />
  },
  {
    path: ROUTES.reports,
    component: Layout(Reports)
  },
  {
    path: ROUTES.screenReader,
    component: Layout(ScreenReader)
  },
  {
    path: ROUTES.report,
    component: Layout(Report)
  }
];

export default Layout;
