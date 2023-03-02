import React from 'react';
import RootPathContainer from 'common/RootPathContainer';
import { LayoutWOSidebar, LayoutWSidebar } from 'features/Layout';
import { ProjectList } from 'features/Onboarding';

import { ROUTES } from './routes';

const Home = React.lazy(() => import('features/Home'));

export const APP_ROUTES = [
  {
    path: ROUTES.root,
    isProtected: true,
    component: <RootPathContainer />
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
      }
    ]
  },
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
        path: ROUTES.testing_trends,
        isProtected: true,
        component: <Home />
      }
    ]
  }
];
