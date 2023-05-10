import { BarChartOutlinedIcon, BugReportOutlinedIcon } from 'assets/icons';

export const TABS_ARRAY = [
  {
    name: 'Results',
    count: 0,
    icon: BarChartOutlinedIcon
  },
  { name: 'Issues', count: 0, icon: BugReportOutlinedIcon }
];

export const RESULTS_DROP_OPTIONS = [
  {
    id: 'failed',
    body: 'Add Fail Result'
  },
  {
    id: 'retest',
    body: 'Add Retest Result'
  },
  {
    id: 'blocked',
    body: 'Add Blocked Result'
  },
  {
    id: 'skipped',
    body: 'Add Skipped Result'
  }
];

export const TR_DROP_OPTIONS = [
  {
    id: 'view_test_case',
    body: 'View Test Case'
  }
];
