import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import Repository from 'features/Repository';
import TestRuns from 'features/TestRuns';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

const MainRoute = () => {
  const location = useLocation();

  return (
    <div
      className={classNames('flex flex-1 flex-col items-stretch', {
        // 'md:pl-64': location.pathname !== AppRoute.ROOT,
      })}
    >
      <Routes>
        <Route path={AppRoute.ROOT} element={<LoginScreen />} />
        <Route path={AppRoute.PROJECTS} element={<AllProjects />} />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId${AppRoute.DASHBOARD}?`}
          element={<Dashboard />}
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.REPO}/folder?/:folderId?`}
          element={<Repository />}
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_RUNS}`}
          element={<TestRuns />}
        />
      </Routes>
    </div>
  );
};

export default MainRoute;
