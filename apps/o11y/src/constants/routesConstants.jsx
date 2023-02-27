import React from 'react';
import RootPathContainer from 'common/RootPathContainer';
import { LayoutWOSidebar, LayoutWSidebar } from 'features/Layout';

import { ROUTES } from './routes';

const Home = React.lazy(() => import('features/Home'));
const Counter = React.lazy(() => import('features/Counter'));

export const APP_ROUTES = [
  {
    path: ROUTES.root,
    isProtected: true,
    component: <LayoutWSidebar />,
    children: [
      {
        path: ROUTES.builds,
        isProtected: true,
        component: <Home />
      },
      {
        path: ROUTES.root,
        isProtected: true,
        component: <RootPathContainer />
      }
    ]
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <LayoutWOSidebar />,
    children: [
      {
        path: ROUTES.projects,
        isProtected: true,
        component: <Counter />
      }
    ]
  }
];
