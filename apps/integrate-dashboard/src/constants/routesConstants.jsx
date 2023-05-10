import React from 'react';

import Counter from '../features/Counter';
import Home from '../features/Home';

const Dummy = () => <h1>Hello world</h1>;
export const APP_ROUTES = [
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
    component: <Home />
  }
];
