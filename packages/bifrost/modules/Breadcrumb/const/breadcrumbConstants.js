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
    icon: <HomeIcon className="h-5 w-5 flex-shrink-0 mr-2" aria-hidden="true" />
  },
  {
    name: 'Project Nero',
    url: '/',
    current: false,
    icon: <HomeIcon className="h-5 w-5 flex-shrink-0 mr-2" aria-hidden="true" />
  },
  {
    name: 'Current Page',
    url: '/',
    current: true,
    icon: <HomeIcon className="h-5 w-5 flex-shrink-0 mr-2" aria-hidden="true" />
  }
];
