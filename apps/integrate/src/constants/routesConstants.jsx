import React from 'react';
import { Navigate } from 'react-router-dom';

import Layout from '../features/Layout';
import Logs from '../features/LogsPage';
import Overview from '../features/Overview';

import { ROUTES } from './routes';

export const APP_ROUTES = [
  {
    path: ROUTES.root,
    isProtected: true,
    component: <Navigate to={ROUTES.overview} replace />
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <Layout />,
    children: [
      {
        path: ROUTES.overview,
        isProtected: true,
        component: <Overview />
      },
      {
        path: ROUTES.getting_started,
        isProtected: true,
        // TODO : Replace component with GettingStarted
        component: <Overview />
      },
      {
        path: ROUTES.logs,
        isProtected: true,
        component: <Logs />
      }
    ]
  }
];
