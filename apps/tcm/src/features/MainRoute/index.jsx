import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Repository from 'features/Repository';

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
        <Route path={`${AppRoute.PROJECTS}/:projectId`} element="Dashboard" />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.REPO}/folder?/:folderId?`}
          element={<Repository />}
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_CASES}`}
          element={<Repository />}
        />
        <Route
          path={`${AppRoute.PROJECTS}/:projectId?${AppRoute.TEST_RUNS}`}
          element={<Repository />}
        />
      </Routes>
    </div>
  );
};

export default MainRoute;
