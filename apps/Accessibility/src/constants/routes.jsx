import React from 'react';
import { ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';
import Report from 'features/Report';
import Reports from 'features/Reports';
import ScreenReader from 'features/ScreenReader';

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
  }
];

export default Layout;
