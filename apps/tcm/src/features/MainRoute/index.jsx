import React from 'react';
import { Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import Repository from 'features/Repository';
import TestRuns from 'features/TestRuns';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

import { OnlyPublicComponent, PrivateComponent } from './RouteHelpers';

const MainRoute = () => (
  <div
    className={classNames('flex flex-1 flex-col items-stretch', {
      // 'md:pl-64': location.pathname !== AppRoute.ROOT,
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
        path={`${AppRoute.PROJECTS}/:projectId${AppRoute.DASHBOARD}?`}
        element={<Dashboard />}
      />
      <Route
        path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_CASES}/folder?/:folderId?`}
        element={<Repository />}
      />
      <Route
        path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_RUNS}`}
        element={<TestRuns />}
      />
    </Routes>
  </div>
);

export default MainRoute;
