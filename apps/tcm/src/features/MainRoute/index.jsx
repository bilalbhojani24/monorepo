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
        <Route
          path={`${AppRoute.REPO}/:projectId?/folder?/:folderId?`}
          element={<Repository />}
        />
        <Route
          exact
          path={`${AppRoute.TEST_CASES}/:projectId`}
          element="TEST_CASES"
        />
        <Route
          exact
          path={`${AppRoute.TEST_RUNS}/:projectId`}
          element="TEST_RUNS"
        />
      </Routes>
    </div>
  );
};

export default MainRoute;
