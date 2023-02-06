/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
import React, { Suspense } from 'react';
// import Settings from 'bsA11y/Settings';
// import RootPathContainer from './RootPathContainer';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
// import { Route, Routes } from 'react-router-dom';
// import App from 'src/App';
// import LayoutLoader from 'app/_components/LayoutLoader';
import { BASE_ROUTE, ROUTES } from 'constants';
import Dashboard from 'features/Dashboard';
import Report from 'features/Report';
// import Home from 'features/Home';
import Reports from 'features/Reports';
// import Reports from 'bsA11y/Reports';
import ScreenReader from 'features/ScreenReader';

// const EmptyPage = lazy(() => import('bsA11y/EmptyPage'));

const Layout = () => (
  <Dashboard>
    <Routes>
      <Route path={ROUTES.reports} element={<Reports />} />
      <Route exact path={ROUTES.screenReader} element={<ScreenReader />} />
      <Route exact path={ROUTES.report} element={<Report />} />
      {/* <Route path="/" element={<div>Hello</div>}>
        
      </Route> */}
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
