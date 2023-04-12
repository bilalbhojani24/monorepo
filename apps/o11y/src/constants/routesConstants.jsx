import React from 'react';
import { Navigate } from 'react-router-dom';
import NotFound from 'common/NotFound';
import { LayoutWOSidebar, LayoutWSidebar } from 'features/Layout';
import { OnboardingFrameworkSelector, ProjectList } from 'features/Onboarding';
import RootPathHandler from 'features/RootPathHandler';
import Settings from 'features/Settings/containers/Settings';

import { ROUTES } from './routes';

const AllBuilds = React.lazy(() => import('features/AllBuilds'));
const BuildDetails = React.lazy(() => import('features/BuildDetails'));

const Integrations = React.lazy(() => import('features/Integrations'));

const BuildShortUrlRedirect = React.lazy(() =>
  import('features/BuildShortUrlRedirect')
);
const TestingTrends = React.lazy(() => import('features/TestingTrends'));

const GeneralSettings = React.lazy(() =>
  import('features/Settings/containers/GeneralSettings')
);
const AlertsSettings = React.lazy(() =>
  import('features/Settings/containers/AlertsSettings')
);
const AutoAnalysisSettings = React.lazy(() =>
  import('features/Settings/containers/AutoAnalysisSettings')
);
const FailureCategoriesSettings = React.lazy(() =>
  import('features/Settings/containers/FailureCategoriesSettings')
);
const ReRunSettings = React.lazy(() =>
  import('features/Settings/containers/ReRunSettings')
);

const SuiteHealth = React.lazy(() => import('features/SuiteHealth'));

export const APP_ROUTES = [
  {
    path: ROUTES.all,
    isProtected: true,
    component: <Navigate to={ROUTES.not_found} replace />
  },
  {
    path: ROUTES.not_found,
    isProtected: true,
    component: <NotFound to={ROUTES.not_found} replace />
  },
  {
    path: ROUTES.buildShort,
    isProtected: true,
    component: <BuildShortUrlRedirect />
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <RootPathHandler />
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <LayoutWOSidebar />,
    children: [
      {
        path: ROUTES.projects,
        isProtected: true,
        component: <ProjectList />
      },
      {
        path: ROUTES.get_started,
        isProtected: true,
        component: <OnboardingFrameworkSelector />
      }
    ]
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <LayoutWSidebar />,
    children: [
      {
        path: ROUTES.testing_trends,
        isProtected: true,
        component: <TestingTrends />
      },
      {
        path: ROUTES.build,
        isProtected: true,
        component: <BuildDetails />
      },
      {
        path: ROUTES.builds,
        isProtected: true,
        component: <AllBuilds />
      },
      {
        path: ROUTES.suite_health,
        isProtected: true,
        component: <SuiteHealth />
      },
      {
        path: ROUTES.settings,
        isProtected: true,
        component: <Settings />,
        children: [
          {
            path: ROUTES.settings_general,
            isProtected: true,
            component: <GeneralSettings />
          },
          {
            path: ROUTES.settings_alerts,
            isProtected: true,
            component: <AlertsSettings />
          },
          {
            path: ROUTES.settings_auto_analyser,
            isProtected: true,
            component: <AutoAnalysisSettings />
          },
          {
            path: ROUTES.settings_failure_categories,
            isProtected: true,
            component: <FailureCategoriesSettings />
          },
          {
            path: ROUTES.settings_re_run,
            isProtected: true,
            component: <ReRunSettings />
          }
        ]
      },
      {
        path: ROUTES.integrations_base,
        isProtected: true,
        component: <Integrations />
      }
    ]
  }
];
