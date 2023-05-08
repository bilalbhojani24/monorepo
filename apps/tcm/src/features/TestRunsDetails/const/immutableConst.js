import { ACTIVE_TEST_RUNS_COLOR } from '../../Dashboard/const/immutableConst';

export const TR_DROP_OPTIONS = [
  {
    id: 'close_run',
    body: 'Close Test Run'
  },
  {
    id: 'edit_details',
    body: 'Edit Test Run'
  },
  {
    id: 'delete',
    body: 'Delete',
    divider: true
  }
];

export const STATUS_OPTIONS = [
  {
    label: 'Passed',
    color: ACTIVE_TEST_RUNS_COLOR.Passed,
    value: 'passed'
  },
  {
    label: 'Failed',
    color: ACTIVE_TEST_RUNS_COLOR.Failed,
    value: 'failed'
  },
  {
    label: 'Retest',
    color: ACTIVE_TEST_RUNS_COLOR.Retest,
    value: 'retest'
  },
  {
    label: 'Blocked',
    color: '#818CF8',
    value: 'blocked'
  },
  {
    label: 'Skipped',
    color: ACTIVE_TEST_RUNS_COLOR.Skipped,
    value: 'skipped'
  },
  {
    label: 'Untested',
    color: ACTIVE_TEST_RUNS_COLOR.Untested,
    value: 'untested'
  }
];

export const ISSUES_TABS_ARRAY = [
  { name: 'Linked with Test Result', id: 'test_result_issues' },
  { name: 'Linked with Test Run', id: 'issues' }
];
