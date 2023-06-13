import AppRoute from 'const/routes';

export const SETUP_FORMATS = [
  {
    id: 'quick_import',
    title: 'Quick Import',
    badgeText: 'Recommended',
    description:
      'Select if you want to migrate project data from TestRail or Zephyr Scale'
  },
  {
    id: 'scratch',
    title: 'Start from scratch',
    description:
      'You can start from a clean slate and add data through CSV import'
  }
];

export const TC_ASSIGNED_NOTIFICATION_ID = 'tc_assigned_notification_id';
export const INFINITY = 2147483647; // this is largest number that settimeout can take https://developer.mozilla.org/en-US/docs/Web/API/setTimeout reference

export const NO_AUTO_ASSIGN_PAGES = [
  AppRoute.ONBOARDING,
  AppRoute.NO_ACCESS,
  AppRoute.NOT_FOUND
];
