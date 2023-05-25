import React from 'react';
import CreateGrid from 'features/CreateGrid/components/CreateGrid';
import GridConsole from 'features/GridConsole/components/Dashboard';
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
        path: ROUTES.CREATE_GRID,
        isProtected: true,
        component: <CreateGrid />
      }
    ]
  }
];
