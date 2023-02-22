import React from 'react';
import { ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';
import Report from 'features/Report';
import Reports from 'features/Reports';
import ScreenReader from 'features/ScreenReader';
import SiteScanner from 'features/SiteScanner';
import ScanDetails from 'features/SiteScanner/ScanDetails';
import ScanReport from 'features/SiteScanner/ScanReport';

const Layout = (Component) => (
  <Dashboard>
    <Component />
  </Dashboard>
);

export const APP_ROUTES = [
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
    // isProtected: true,
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
  }
];

export default Layout;
