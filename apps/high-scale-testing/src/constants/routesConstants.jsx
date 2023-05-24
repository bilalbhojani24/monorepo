import React from 'react';
import GridConsole from 'features/GridConsole/components/Dashboard';
import { Layout } from 'features/Layout';
import { Onboarding } from 'features/Onboarding';

import ROUTES from './routes';

export const APP_ROUTES = [
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
        path: ROUTES.ONBOARDING,
        isProtected: true,
        component: <Onboarding />
      }
    ]
  }
];
