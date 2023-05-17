import {
  AssignmentOutlinedIcon,
  BarChartOutlinedIcon,
  CodeOutlinedIcon,
  FolderOpenOutlinedIcon,
  HomeOutlinedIcon,
  SettingsOutlinedIcon
} from 'assets/icons';
import AppRoute from 'const/routes';

export const basePrimaryNavLinks = [
  {
    id: AppRoute.ROOT,
    label: 'All Projects',
    activeIcon: HomeOutlinedIcon,
    inActiveIcon: HomeOutlinedIcon,
    path: AppRoute.ROOT
  }
];

export const internalPrimaryNavLinks = [
  {
    id: AppRoute.DASHBOARD,
    label: 'Dashboard',
    activeIcon: BarChartOutlinedIcon,
    inActiveIcon: BarChartOutlinedIcon,
    path: AppRoute.DASHBOARD,
    instrumentKey: 'TM_DashboardMenuClicked'
  },
  {
    id: AppRoute.TEST_CASES,
    label: 'Test Cases',
    activeIcon: FolderOpenOutlinedIcon,
    inActiveIcon: FolderOpenOutlinedIcon,
    path: AppRoute.TEST_CASES,
    instrumentKey: 'TM_TestCasesMenuClicked'
  },
  {
    id: AppRoute.TEST_RUNS,
    label: 'Test Runs',
    activeIcon: CodeOutlinedIcon,
    inActiveIcon: CodeOutlinedIcon,
    path: AppRoute.TEST_RUNS,
    instrumentKey: 'TM_TrMenuClicked'
  }
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
    path: AppRoute.SETTINGS
  },
  {
    id: AppRoute.RESOURCES,
    label: 'Documentation',
    activeIcon: AssignmentOutlinedIcon,
    inActiveIcon: AssignmentOutlinedIcon,
    isExternalLink: true,
    path: 'https://www.browserstack.com/docs/test-management/overview/what-is-test-management'
  }
];

export const IMPORT_IN_PROGRESS = [
  {
    id: 'import_in_progress',
    label: 'Import in progress',
    activeIcon: SettingsOutlinedIcon,
    inActiveIcon: SettingsOutlinedIcon
  }
];

export const noNavRoutes = [
  AppRoute.LANDING,
  AppRoute.ONBOARDING,
  AppRoute.NOT_FOUND,
  AppRoute.NO_ACCESS
];
