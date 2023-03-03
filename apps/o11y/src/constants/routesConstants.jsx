import React from 'react';
import { Navigate } from 'react-router-dom';
import EmptyPage from 'common/EmptyPage';
import NotFound from 'common/NotFound';
import RootPathContainer from 'common/RootPathContainer';
import { LayoutWOSidebar, LayoutWSidebar } from 'features/Layout';
import { OnboardingFrameworkSelector, ProjectList } from 'features/Onboarding';

import { ROUTES } from './routes';

export const APP_ROUTES = [
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
      },
      {
        path: ROUTES.get_started,
        isProtected: true,
        component: <OnboardingFrameworkSelector />
      }
    ]
  },
  {
    path: ROUTES.root,
    isProtected: true,
    component: <LayoutWSidebar />,
    children: [
      {
        path: ROUTES.testing_trends,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      },
      {
        path: ROUTES.build,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      },
      {
        path: ROUTES.builds,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      },
      {
        path: ROUTES.suite_health,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      },
      {
        path: ROUTES.settings_general,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      },
      {
        path: ROUTES.integrations_base,
        isProtected: true,
        component: (
          <EmptyPage isUpComing text="Something awesome is coming soon" />
        )
      }
    ]
  }
];
