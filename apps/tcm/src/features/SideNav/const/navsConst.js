import AppRoute from 'const/routes';
import { HomeOutlinedIcon } from 'icons';

export const basePrimaryNavLinks = [
  {
    id: AppRoute.PROJECTS,
    label: 'All Projects',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.PROJECTS
  },
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.TEST_RUNS
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon
  }
];

export const internalPrimaryNavLinks = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.PROJECTS
  },
  {
    id: 'repository',
    label: 'Repository',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.TEST_RUNS
  },
  {
    id: 'testruns',
    label: 'Test Runs',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon
  },
  {
    id: 'reports',
    label: 'Reports',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon
  }
];

export const secondaryNavLinks = [
  {
    id: 'settings',
    label: 'Settings',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.TEST_RUNS
  },
  {
    id: 'documentation',
    label: 'Documentation',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon
  }
];
