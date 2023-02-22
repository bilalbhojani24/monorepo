import React from 'react';
import { Navigate } from 'react-router-dom';
import AlphaAccess from 'common/MiscPages/AlphaAccess';
import NotFound from 'common/MiscPages/NotFound';
import Dashboard from 'features/Dashboard';
import ImportCSV from 'features/importCSVFlow';
import LoginScreen from 'features/Login';
import Onboarding from 'features/Onboarding';
import AllProjects from 'features/Projects';
import Import from 'features/quickImportFlow';
import Repository from 'features/Repository';
import Settings from 'features/Settings';
import TestRuns, { AddEditTestRun } from 'features/TestRuns';
import TestRunsDetails, { Issues } from 'features/TestRunsDetails';

const AppRoute = {
  ROOT: '/',
  NO_ACCESS: '/access',
  NOT_FOUND: '/404',
  LANDING: '/landing',
  TEST_CASES: '/projects/:projectId/folder/:folderId?/test-cases?/:testCaseId?',
  TEST_CASES_SEARCH: '/projects/:projectId/folder/search',
  DASHBOARD: '/projects/:projectId',
  TEST_RUNS: '/projects/:projectId/test-runs',
  TEST_RUN_DETAILS: '/projects/:projectId/test-runs/:testRunId/test-cases',
  TEST_RUN_ISSUES:
    '/projects/:projectId/test-runs/:testRunId/test-cases/issues',
  TEST_RUNS_EDIT: '/projects/:projectId/test-runs/:testRunId/edit',
  ONBOARDING: '/welcome',
  RESOURCES: '/resources',
  SETTINGS: '/settings',
  REPORTS: '/reports',
  IMPORT: '/import',
  IMPORT_CSV: '/import/csv',
  SETTINGS_API_KEYS: '/settings/api-keys'
};
const Dummy = () => <h1 className="ml-96">Dummy</h1>;

export const APP_ROUTES = [
  {
    path: AppRoute.ROOT,
    isProtected: true,
    component: <AllProjects />
  },
  {
    path: '/dummy',
    isProtected: true,
    component: <Dummy />
  },
  {
    path: AppRoute.LANDING,
    isProtected: true,
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
    path: AppRoute.IMPORT_CSV,
    isProtected: true,
    component: <ImportCSV />
  },
  {
    path: AppRoute.NO_ACCESS,
    isProtected: true,
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

export const BASE_API_URL = import.meta.env.DEV
  ? 'https://teststack.bsstag.com'
  : 'https://test-management.browserstack.com';

export default AppRoute;
