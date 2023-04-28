import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import AlphaAccess from 'common/MiscPages/AlphaAccess';
import NotFound from 'common/MiscPages/NotFound';
import AppRoute, { BASE_API_URL } from 'const/routes';
// import AppRoute from 'const/routes';
import Dashboard from 'features/Dashboard';
import ImportCSV from 'features/importCSVFlow';
import Onboarding from 'features/Onboarding';
import Import from 'features/quickImportFlow';
import Repository from 'features/Repository';
import Settings from 'features/Settings';
import { noNavRoutes } from 'features/SideNav/const/navsConst';
import TestRuns, { AddEditTestRun } from 'features/TestRuns';
import TestRunsDetails, { Issues } from 'features/TestRunsDetails';

import 'api/_utils/interceptor';

import LoginScreen from '../Login';
import AllProjects from '../Projects';

import useAuthentication from './components/useAuthentication';
import useAuthRoutes from './components/useAuthRoutes'; // to be changed to hooks once bifrost clear the issues

const MainRoute = () => {
  const location = useLocation();
  const { authInit } = useAuthentication();

  const APP_ROUTES = [
    {
      path: AppRoute.ROOT,
      isProtected: true,
      component: <AllProjects />
    },
    {
      path: AppRoute.LANDING, // to be removed
      isProtected: false,
      component: <LoginScreen />
    },
    {
      path: AppRoute.DASHBOARD,
      isProtected: true,
      component: <Dashboard />
    },
    {
      path: AppRoute.ONBOARDING,
      isProtected: true,
      component: <Onboarding />
    },
    {
      path: AppRoute.TEST_CASES,
      isProtected: true,
      component: <Repository />
    },
    {
      path: AppRoute.TEST_CASES_SEARCH,
      isProtected: true,
      component: <Repository isSearch />
    },
    {
      path: AppRoute.TEST_RUNS,
      isProtected: true,
      component: <TestRuns key="table" />
    },
    {
      path: AppRoute.TEST_RUNS_EDIT,
      isProtected: true,
      component: <AddEditTestRun isEdit />
    },
    {
      path: AppRoute.TEST_RUN_ISSUES,
      isProtected: true,
      component: <Issues />
    },
    {
      path: AppRoute.TEST_RUNS_EDIT,
      isProtected: true,
      component: <AddEditTestRun isEdit />
    },
    {
      path: AppRoute.TEST_RUN_DETAILS,
      isProtected: true,
      component: <TestRunsDetails />
    },
    {
      path: AppRoute.SETTINGS,
      isProtected: true,
      component: <Settings />
    },
    {
      path: AppRoute.RESOURCES,
      isProtected: true,
      component: <>Resources</>
    },
    {
      path: AppRoute.IMPORT,
      isProtected: true,
      component: <Import />
    },
    {
      path: AppRoute.IMPORT_WITH_PROJECTS,
      isProtected: true,
      component: <Import />
    },
    {
      path: AppRoute.IMPORT_CSV,
      isProtected: true,
      component: <ImportCSV />
    },
    {
      path: AppRoute.NO_ACCESS,
      isProtected: false,
      component: <AlphaAccess />
    },
    {
      path: AppRoute.NOT_FOUND,
      isProtected: true,
      component: <NotFound />
    },
    {
      path: '*',
      component: <Navigate to={AppRoute.NOT_FOUND} replace />
    }
  ];

  // Auth Routes
  const Routes = useAuthRoutes(
    APP_ROUTES,
    authInit,
    `${BASE_API_URL}/api/v1/auth/start-sso`
  );

  return (
    <div
      className={classNames('flex flex-1 flex-col overflow-hidden', {
        'md:pl-64': !noNavRoutes.includes(location.pathname)
      })}
    >
      {Routes}
    </div>
  );
};

export default MainRoute;
