import AppRoute from 'const/routes';
import {
  AssignmentOutlinedIcon,
  BarChartOutlinedIcon,
  CodeOutlinedIcon,
  DonutLargeOutlinedIcon,
  FolderOpenOutlinedIcon,
  HomeOutlinedIcon,
  SettingsOutlinedIcon,
} from 'Icons';

export const basePrimaryNavLinks = [
  {
    id: AppRoute.PROJECTS,
    label: 'All Projects',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.PROJECTS,
  },
  {
    id: AppRoute.SETTINGS,
    label: 'Settings',
    activeIcon: SettingsOutlinedIcon,
    inActiveIcon: SettingsOutlinedIcon,
    path: AppRoute.SETTINGS,
  },
  {
    id: AppRoute.DOCUMENTATION,
    label: 'Documentation',
    activeIcon: AssignmentOutlinedIcon,
    inActiveIcon: AssignmentOutlinedIcon,
    path: AppRoute.DOCUMENTATION,
  },
];

export const internalPrimaryNavLinks = [
  {
    id: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.DASHBOARD}`,
    label: 'Dashboard',
    activeIcon: BarChartOutlinedIcon,
    inActiveIcon: BarChartOutlinedIcon,
    path: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.DASHBOARD}`,
  },
  {
    id: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.REPO}`,
    label: 'Repository',
    activeIcon: FolderOpenOutlinedIcon,
    inActiveIcon: FolderOpenOutlinedIcon,
    path: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.REPO}`,
  },
  {
    id: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.TEST_RUNS}`,
    label: 'Test Runs',
    activeIcon: CodeOutlinedIcon,
    inActiveIcon: CodeOutlinedIcon,
    path: `${AppRoute.PROJECTS}/$PROJECTID$${AppRoute.TEST_RUNS}`,
  },
  // {
  //   id: AppRoute.REPORTS,
  //   label: 'Reports',
  //   activeIcon: DonutLargeOutlinedIcon,
  //   inActiveIcon: DonutLargeOutlinedIcon,
  //   path: AppRoute.REPORTS
  // }
];

export const secondaryNavLinks = [
  {
    id: AppRoute.SETTINGS,
    label: 'Settings',
    activeIcon: SettingsOutlinedIcon,
    inActiveIcon: SettingsOutlinedIcon,
    path: AppRoute.SETTINGS,
  },
  {
    id: AppRoute.DOCUMENTATION,
    label: 'Documentation',
    activeIcon: AssignmentOutlinedIcon,
    inActiveIcon: AssignmentOutlinedIcon,
    path: AppRoute.DOCUMENTATION,
  },
];
