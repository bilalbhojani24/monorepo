/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BASE_ROUTE, ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';
import Report from 'features/Report';
import Reports from 'features/Reports';
import ScreenReader from 'features/ScreenReader';
import SiteScanner from 'features/SiteScanner';
import ScanDetails from 'features/SiteScanner/ScanDetails';
import ScanReport from 'features/SiteScanner/ScanReport';

// const EmptyPage = lazy(() => import('bsA11y/EmptyPage'));

const Layout = () => (
  <Dashboard>
    <Routes>
      <Route path={ROUTES.reports} element={<Reports />} />
      <Route exact path={ROUTES.screenReader} element={<ScreenReader />} />
      <Route exact path={ROUTES.report} element={<Report />} />
      <Route exact path={ROUTES.siteScanner} element={<SiteScanner />} />
      <Route
        exact
        path={`${ROUTES.scanDetails}/:id`}
        element={<ScanDetails />}
      />
      <Route exact path={`${ROUTES.scanReports}`} element={<ScanReport />} />
    </Routes>
  </Dashboard>
  // <Routes>
  //   <Route
  //     path={ROUTES.home}
  //     element={
  //       <Dashboard>
  //         <Home />
  //       </Dashboard>
  //     }
  //   />
  // </Routes>
  // <Router basename={BASE_ROUTE}>
  //   {/* <Suspense fallback={<LayoutLoader />}> */}
  //   <Dashboard>
  //     <Switch>
  //       {/* {/* <Route exact path={ROUTES.build} render={(props) => <TestList {...props} />} /> */}
  //       <Route
  //         exact
  //         path={ROUTES.home}
  //         render={(props) => <Home {...props} />}
  //       />
  //       {/* <Route
  //           exact
  //           path={ROUTES.reports}
  //           render={(props) => <Reports {...props} />}
  //         />
  //         <Route
  //           exact
  //           path={ROUTES.screenReader}
  //           render={(props) => <ScreenReader {...props} />}
  //         />
  //         <Route
  //           exact
  //           path={ROUTES.report}
  //           render={(props) => <Report {...props} />}
  //         />
  //         <Route
  //           path={ROUTES.settings}
  //           render={(props) => <Settings {...props} />}
  //         /> */}
  //       {/* <Route exact path={ROUTES.root} render={() => <RootPathContainer />} /> */}
  //     </Switch>
  //   </Dashboard>
  //   {/* </Suspense> */}
  // </Router>
);

export default Layout;
