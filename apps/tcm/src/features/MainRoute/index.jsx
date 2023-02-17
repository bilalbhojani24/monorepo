import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import ImportCSV from 'features/importCSVFlow';
import Import from 'features/quickImportFlow';
import Repository from 'features/Repository';
import Settings from 'features/Settings';
import TestRuns, { AddEditTestRun } from 'features/TestRuns';
import TestRunsDetails from 'features/TestRunsDetails';

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
      className={classNames('flex flex-1 flex-col overflow-hidden', {
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
          path={AppRoute.TEST_CASES_SEARCH}
          element={
            <PrivateComponent>
              <Repository isSearch />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.TEST_RUNS}
          element={
            <PrivateComponent>
              <TestRuns key="table" />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.TEST_RUNS_EDIT}
          element={
            <PrivateComponent>
              <AddEditTestRun isEdit />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.TEST_RUN_DETAILS}
          element={
            <PrivateComponent>
              <TestRunsDetails />
            </PrivateComponent>
          }
        />
        <Route
          path={AppRoute.SETTINGS}
          element={
            <PrivateComponent>
              <Settings />
            </PrivateComponent>
        }
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
