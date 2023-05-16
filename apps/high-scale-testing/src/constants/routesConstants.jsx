import React from 'react';

import Counter from '../features/Counter';
import Dashboard from '../features/GridConsole/components/Dashboard';
import { Layout } from '../features/Layout';
import { Onboarding } from '../features/Onboarding';

import ROUTES from './routes';

const Dummy = () => <h1>Hello world</h1>;
export const APP_ROUTES = [
  // Todo: Remove the Counter Router...
  {
    path: '/counter',
    isProtected: true,
    children: [
      {
        path: '/counter/new',
        component: (
          <>
            <Counter />
          </>
        ),
        isProtected: true
      },
      {
        path: '/counter/dummy',
        component: <Dummy />,
        isProtected: true
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
        component: <Dashboard />
      },
      {
        path: ROUTES.ONBOARDING,
        isProtected: true,
        component: <Onboarding />
      }
    ]
  }
];
