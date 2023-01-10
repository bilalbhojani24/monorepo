import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import classNames from 'classnames';
import { AUTH_TOKEN_KEY } from 'const/immutables';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import Repository from 'features/Repository';
import TestRuns from 'features/TestRuns';
import Cookies from 'universal-cookie';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

const cookies = new Cookies();

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

const PrivateComponent = ({ children }) => children;
// const isAuthenticatedUser = useMemo(() => cookies.get(AUTH_TOKEN_KEY), []);

// /// if not logged in, redirect to login
// return isAuthenticatedUser ? (
//   children || ''
// ) : (
//   <Navigate to={AppRoute.LANDING} />
// );

const OnlyPublicComponent = ({ children }) => children;
// const isAuthenticatedUser = useMemo(() => cookies.get(AUTH_TOKEN_KEY), []);

// // if logged in redirect to dashboard
// return !isAuthenticatedUser ? children : <Navigate to={AppRoute.ROOT} />;

export default MainRoute;
