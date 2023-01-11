import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import Repository from 'features/Repository';
import TestRuns from 'features/TestRuns';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

import {
  OnlyPublicComponent,
  PrivateComponent,
} from './components/RouteHelpers';
import useMainRoute from './components/useMainRoute';

const MainRoute = () => {
  const location = useLocation();
  useMainRoute();

  return (
    <div
      className={classNames('flex flex-1 flex-col items-stretch', {
        'md:pl-64': location.pathname !== AppRoute.LANDING,
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
              <AllProjects defaultTab="Active Projects" />
            </PrivateComponent>
          }
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId${AppRoute.DASHBOARD}`}
          element={
            <PrivateComponent>
              <Dashboard />
            </PrivateComponent>
          }
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_CASES}/folder?/:folderId?`}
          element={
            <PrivateComponent>
              <Repository />
            </PrivateComponent>
          }
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_RUNS}`}
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
          path={AppRoute.DOCUMENTATION}
          element={<PrivateComponent>DOCUMENTATION</PrivateComponent>}
        />
        <Route path="*" element={<Navigate to={AppRoute.ROOT} replace />} />
      </Routes>
    </div>
  );
};

export default MainRoute;
