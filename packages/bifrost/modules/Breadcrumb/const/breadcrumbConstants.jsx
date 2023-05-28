import React from 'react';

import { HomeIcon } from '../../Icon';

export const BREADCRUMB_SIZE = {
  fullWidth: 'full-width',
  contained: 'contained',
  default: 'default'
};

export const breadcrumbData = [
  {
    name: 'Home',
    url: '/',
    current: false,
    icon: <HomeIcon className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
  },
  {
    name: 'Project Nero',
    url: '/',
    current: false,
    icon: <HomeIcon className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
  },
  {
    name: 'Current Page',
    url: '/',
    current: true,
    icon: <HomeIcon className="mr-2 h-5 w-5 shrink-0" aria-hidden="true" />
  }
];

export const onlyIconOrTextBreadcrumbData = [
  {
    url: '/',
    current: false,
    icon: <HomeIcon className="ml-2 h-5 w-5 shrink-0" aria-hidden="true" />
  },
  {
    name: 'Project Nero',
    url: '/',
    current: false
  },
  {
    name: 'Current Page',
    url: '/',
    current: true
  }
];
