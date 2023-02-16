import React from 'react';
import Layout from 'features/Layout';

export const APP_ROUTES = [
  {
    path: '/*',
    isProtected: true,
    component: <Layout />
  }
];
