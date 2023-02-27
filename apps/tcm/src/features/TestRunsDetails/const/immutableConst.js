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
    class: 'bg-success-600',
    value: 'passed'
  },
  {
    label: 'Failed',
    class: 'bg-danger-500',
    value: 'failed'
  },
  {
    label: 'Retest',
    class: 'bg-attention-400',
    value: 'retest'
  },
  {
    label: 'Blocked',
    class: '',
    color: ACTIVE_TEST_RUNS_COLOR.blocked,
    value: 'blocked'
  },
  {
    label: 'Skipped',
    class: 'bg-base-200',
    value: 'skipped'
  },
  {
    label: 'Untested',
    class: 'bg-base-600',
    value: 'untested'
  }
];
