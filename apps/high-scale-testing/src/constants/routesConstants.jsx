import React from 'react';
import CreateGrid from 'features/CreateGrid/components/CreateGrid';
import GridConsole from 'features/GridConsole/components/Dashboard';
import GeneralSettings from 'features/GridConsole/components/GeneralSettings';
import GridOverview from 'features/GridConsole/components/GridOverview';
import GridSettings from 'features/GridConsole/components/GridSettings';
import LayoutGridDetail from 'features/GridConsole/components/LayoutGridDetail';
import BrowsersSettings from 'features/GridSettings/components/BrowsersSettings';
import TimeoutSettings from 'features/GridSettings/components/TimeoutSettings';
import { Layout } from 'features/Layout';
import LayoutWOSidebar from 'features/LayoutWOSidebar/components/LayoutWOSidebar';
import { Onboarding } from 'features/Onboarding';

import ROUTES from './routes';

export const APP_ROUTES = [
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
              }
            ]
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
