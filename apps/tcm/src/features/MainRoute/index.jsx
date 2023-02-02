import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import ImportCSV from 'features/importCSVFlow';
import Import from 'features/quickImportFlow';
import Repository from 'features/Repository';
import TestRuns from 'features/TestRuns';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

import {
  OnlyPublicComponent,
  PrivateComponent
} from './components/RouteHelpers';
import useMainRoute from './components/useMainRoute';

const MainRoute = () => {
  const location = useLocation();
  useMainRoute();

  return (
    <div
      className={classNames('flex flex-1 flex-col', {
        'md:pl-64': location.pathname !== AppRoute.LANDING
      })}
    >
      <Routes>
        <Route
          path={AppRoute.LANDING}
          element={
            <OnlyPublicComponent>
              <LoginScreen />
            </OnlyPublicComponent>
          }
        />
        <Route
          path={AppRoute.ROOT}
          element={
            <PrivateComponent>
              <AllProjects />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.DASHBOARD}
          element={
            <PrivateComponent>
              <Dashboard />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.TEST_CASES}
          element={
            <PrivateComponent>
              <Repository />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.TEST_RUNS}
          element={
            <PrivateComponent>
              <TestRuns />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.SETTINGS}
          element={<PrivateComponent>SETTINGS</PrivateComponent>}
        />
        <Route
          path={AppRoute.RESOURCES}
          element={<PrivateComponent>RESOURCES</PrivateComponent>}
        />
        <Route
          path={AppRoute.IMPORT}
          element={
            <PrivateComponent>
              <Import />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.IMPORT_CSV}
          element={
            <PrivateComponent>
              <ImportCSV />
            </PrivateComponent>
          }
        />
        <Route path="*" element="Error 404" />
      </Routes>
    </div>
  );
};

export default MainRoute;
