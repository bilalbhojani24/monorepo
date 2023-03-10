import React, { lazy, Suspense } from 'react';
import Home from 'common/Home';
import Loader from 'common/Loader';
import Welcome from 'common/Welcome';
import { ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';

const Report = lazy(() => import('features/Report'));
const Reports = lazy(() => import('features/Reports'));
const ScreenReader = lazy(() => import('features/ScreenReader'));
const SiteScanner = lazy(() => import('features/SiteScanner'));
const ScanDetails = lazy(() => import('features/SiteScanner/ScanDetails'));
const ScanReport = lazy(() => import('features/SiteScanner/ScanReport'));

const Layout = (Component) => (
  <Suspense fallback={<Loader />}>
    <Dashboard>
      <Component />
    </Dashboard>
  </Suspense>
);

export const APP_ROUTES = [
  {
    path: ROUTES.welcome,
    isProtected: true,
    component: <Welcome />
  },
  {
    path: ROUTES.reports,
    isProtected: true,
    component: Layout(Reports)
  },
  {
    path: ROUTES.screenReader,
    isProtected: true,
    component: Layout(ScreenReader)
  },
  {
    path: ROUTES.report,
    isProtected: true,
    component: Layout(Report)
  },
  {
    path: ROUTES.siteScanner,
    // isProtected: true,
    component: Layout(SiteScanner)
  },
  {
    path: ROUTES.scanDetails,
    // isProtected: true,
    component: Layout(ScanDetails)
  },
  {
    path: ROUTES.scanReports,
    // isProtected: true,
    component: Layout(ScanReport)
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <Home />
  }
];

export default Layout;
