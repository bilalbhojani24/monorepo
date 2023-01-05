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
    id: AppRoute.SETTINGS,
    label: 'Settings',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.SETTINGS
  },
  {
    id: AppRoute.DOCUMENTATION,
    label: 'Documentation',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.DOCUMENTATION
  }
];

export const internalPrimaryNavLinks = [
  {
    id: AppRoute.PROJECTS,
    label: 'Dashboard',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.PROJECTS
  },
  {
    id: AppRoute.REPO,
    label: 'Repository',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.REPO
  },
  {
    id: AppRoute.TEST_RUNS,
    label: 'Test Runs',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.TEST_RUNS
  },
  {
    id: AppRoute.REPORTS,
    label: 'Reports',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.REPORTS
  }
];

export const secondaryNavLinks = [
  {
    id: AppRoute.SETTINGS,
    label: 'Settings',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.SETTINGS
  },
  {
    id: AppRoute.DOCUMENTATION,
    label: 'Documentation',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.DOCUMENTATION
  }
];
