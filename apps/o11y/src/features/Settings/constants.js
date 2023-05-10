export const APPLICABLE_TO = {
  all: {
    id: 'all',
    name: 'All builds'
  },
  selective: {
    id: 'selective',
    name: 'Selective builds'
  }
};

export const ALERT_LEVELS = {
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};
export const ALERT_CONDITION_KEYS = {
  LESS_THAN_EQUAL: 'LESS_THAN_EQUAL',
  GREATER_THAN_EQUAL: 'GREATER_THAN_EQUAL'
};
export const ALERT_CONDITION_MAP = {
  [ALERT_CONDITION_KEYS.LESS_THAN_EQUAL]: {
    formLabel: 'Less than',
    tableText: 'Below'
  },
  [ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL]: {
    formLabel: 'Greater than',
    tableText: 'Above'
  }
};
export const ALERT_TYPES = {
  buildStability: 'buildStability',
  buildPerformance: 'buildPerformance',
  spanOfAlwaysFailingTests: 'spanOfAlwaysFailingTests',
  flakinessPercentage: 'flakinessPercentage',
  mutedDays: 'mutedDays',
  numberOfAlwaysFailingTests: 'numberOfAlwaysFailingTests'
};

export const ALERT_TYPES_INFO = {
  [ALERT_TYPES.buildPerformance]: {
    label: 'Build performance',
    desc: 'Passing tests as a percentage of all tests in a build',
    suffix: ' seconds',
    placeholder_text: 'Build duration (in s)',
    condition: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    alert_condition_text:
      "Specify the build duration (in seconds) threshold over which you'd like to be alerted. We recommend you to set both the critical and warning thresholds."
  },
  [ALERT_TYPES.buildStability]: {
    label: 'Build stability',
    desc: 'Threshold for build duration',
    suffix: '%',
    maxValue: 100,
    condition: ALERT_CONDITION_KEYS.LESS_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.LESS_THAN_EQUAL,
    placeholder_text: 'Build stability (%)',
    alert_condition_text:
      'Build Stability is the percentage total number of passing test cases (final status after re-runs, if applicable) out of test cases that ran in a build.'
  },
  [ALERT_TYPES.spanOfAlwaysFailingTests]: {
    label: 'Span of always failing tests',
    desc: 'Threshold for days a single test can be always failing',
    suffix: ' days',
    condition: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    placeholder_text: 'No. of days',
    alert_condition_text:
      'Set this alert to be notified of stale tests that are failing since the number of days set as threshold.'
  },
  [ALERT_TYPES.flakinessPercentage]: {
    label: 'Flakiness percentage',
    desc: 'Threshold for the percentage of flaky tests allowed in a build run',
    suffix: '%',
    maxValue: 100,
    condition: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    placeholder_text: 'Flaky tests (%)',
    alert_condition_text:
      "Flakiness percentage is the percent of overall tests that you'd allow to be flaky tests in your builds."
  },
  [ALERT_TYPES.mutedDays]: {
    label: 'Muted days',
    desc: 'Threshold number of days that a test can remain muted',
    suffix: ' days',
    condition: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    placeholder_text: 'Muted since (no. of days)',
    alert_condition_text:
      'Set the number of days upto which you want to allow certain tests to remain muted and not appear in overall build results.'
  },
  [ALERT_TYPES.numberOfAlwaysFailingTests]: {
    label: 'Number of always failing tests',
    desc: 'Threshold number of always failing tests allowed in a build',
    suffix: '',
    condition: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    criticalWarnRelation: ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL,
    placeholder_text: 'No. of always failing tests',
    alert_condition_text: `Set the number of acceptable "Always failing" tests beyond which you'd like to be alerted. Always failing tests are tests that have not passed since the last 5 runs.`
  }
};

export const FAILURE_CATEGORIES_TYPES = {
  environmentIssue: 'environmentIssue',
  noDefect: 'noDefect',
  toBeInvestigated: 'toBeInvestigated',
  automationBug: 'automationBug',
  productBug: 'productBug'
};

export const FAILURE_CATEGORIES_INFO = {
  [FAILURE_CATEGORIES_TYPES.environmentIssue]: {
    label: 'Environment Issue'
  },
  [FAILURE_CATEGORIES_TYPES.noDefect]: {
    label: 'No Defect'
  },
  [FAILURE_CATEGORIES_TYPES.toBeInvestigated]: {
    label: 'To be Investigated'
  },
  [FAILURE_CATEGORIES_TYPES.automationBug]: {
    label: 'Automation Bug'
  },
  [FAILURE_CATEGORIES_TYPES.productBug]: {
    label: 'Product Bug'
  }
};

export const MAX_SUB_CATEGORIES_ALLOWED = 5;
