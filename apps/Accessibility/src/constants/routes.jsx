import React from 'react';
// import { Route, Routes } from 'react-router-dom';
import { BASE_ROUTE, ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';
import Report from 'features/Report';
import Reports from 'features/Reports';
import ScreenReader from 'features/ScreenReader';

const Layout = (Component) => (
  <Dashboard>
    <Component />
    {/* <Routes>
      <Route path={ROUTES.reports} element={<Reports />} />
      <Route exact path={ROUTES.screenReader} element={<ScreenReader />} />
      <Route exact path={ROUTES.report} element={<Report />} />
    </Routes> */}
  </Dashboard>
);

export default Layout;

// const Dummy = () => <h1>Hello world</h1>;
export const APP_ROUTES = [
  {
    path: ROUTES.reports,
    component: Layout(Reports)
    // isProtected: true
    // children: [
    //   {
    //     path: '/counter/new',
    //     component: (
    //       <>
    //         <Counter />
    //       </>
    //     ),
    //     isProtected: true
    //   },
    //   {
    //     path: '/counter/dummy',
    //     component: <Dummy />,
    //     isProtected: true
    //   }
    // ]
  },
  {
    path: ROUTES.screenReader,
    // isProtected: true,
    component: Layout(ScreenReader)
  },
  {
    path: ROUTES.report,
    // isProtected: true,
    component: Layout(Report)
  }
];
