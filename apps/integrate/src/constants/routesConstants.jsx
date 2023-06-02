import React from 'react';
import { Navigate } from 'react-router-dom';
import AccessDenied from 'common/AccessDenied';
import NotFound from 'common/NotFound';
import GettingStarted from 'features/GettingStarted';
import Layout from 'features/Layout';
import Logs from 'features/LogsPage';
import Overview from 'features/Overview';

import { ROUTES } from './routes';

export const APP_ROUTES = [
  {
    path: ROUTES.root,
    isProtected: true,
    component: <Navigate to={ROUTES.overview} replace />
  },
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
    path: ROUTES.acccess_denied,
    isProtected: true,
    component: <AccessDenied to={ROUTES.acccess_denied} replace />
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
        component: <GettingStarted />
      },
      {
        path: ROUTES.logs,
        isProtected: true,
        component: <Logs />
      }
    ]
  }
];
