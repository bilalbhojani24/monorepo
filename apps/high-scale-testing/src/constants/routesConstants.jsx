import React from 'react';
import ClusterOverview from 'features/ClusterDetail/components/ClusterOverview';
import LayoutClusterDetail from 'features/ClusterDetail/container/LayoutClusterDetail';
import CreateGrid from 'features/CreateGrid/components/CreateGrid';
import ErrorPage from 'features/ErrorPage/components';
import GridConsole from 'features/GridConsole/components/Dashboard';
import GridOverview from 'features/GridConsole/components/GridOverview';
import LayoutGridDetail from 'features/GridConsole/components/LayoutGridDetail';
import BrowsersSettings from 'features/GridSettings/components/BrowsersSettings';
import GeneralSettings from 'features/GridSettings/components/GeneralSettings';
import TestArtifactsSettings from 'features/GridSettings/components/TestArtifactsSettings';
import TimeoutSettings from 'features/GridSettings/components/TimeoutSettings';
import GridSettings from 'features/GridSettings/container/GridSettings';
import { Layout } from 'features/Layout';
import LayoutWOSidebar from 'features/LayoutWOSidebar/components/LayoutWOSidebar';
import { Onboarding } from 'features/Onboarding';

import ROUTES from './routes';

export const APP_ROUTES = [
  { path: ROUTES.ALL, component: <ErrorPage /> },
  {
    path: '/',
    isProtected: true,
    component: <LayoutWOSidebar />,
    children: [
      {
        path: ROUTES.ONBOARDING,
        isProtected: true,
        component: <Onboarding />
      }
    ]
  },
  {
    path: '/',
    isProtected: true,
    component: <Layout />,
    children: [
      {
        path: ROUTES.GRID_CONSOLE,
        isProtected: true,
        component: <GridConsole />
      },
      {
        path: ROUTES.GRID,
        isProtected: true,
        component: <LayoutGridDetail />,
        children: [
          {
            path: ROUTES.GRID_OVERVIEW,
            isProtected: true,
            component: <GridOverview />
          },
          {
            path: ROUTES.GRID_SETTINGS,
            isProtected: true,
            component: <GridSettings />,
            children: [
              {
                path: ROUTES.GRID_SETTINGS_GENERAL,
                isProtected: true,
                component: <GeneralSettings />
              },
              {
                path: ROUTES.GRID_SETTINGS_BROWSER,
                isProtected: true,
                component: <BrowsersSettings />
              },
              {
                path: ROUTES.GRID_SETTINGS_TIMEOUT,
                isProtected: true,
                component: <TimeoutSettings />
              },
              {
                path: ROUTES.GRID_SETTINGS_TEST_ARTIFACTS,
                isProtected: true,
                component: <TestArtifactsSettings />
              }
            ]
          }
        ]
      },
      {
        path: ROUTES.CLUSTER,
        isProtected: true,
        component: <LayoutClusterDetail />,
        children: [
          {
            path: ROUTES.CLUSTER_OVERVIEW,
            isProtected: true,
            component: <ClusterOverview />
          }
        ]
      },
      {
        path: ROUTES.CREATE_GRID,
        isProtected: true,
        component: <CreateGrid />
      }
    ]
  }
];
