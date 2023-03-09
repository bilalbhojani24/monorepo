export const ALERT_TYPES = {
  buildPerformance: 'buildPerformance',
  buildStability: 'buildStability',
  spanOfAlwaysFailingTests: 'spanOfAlwaysFailingTests',
  flakinessPercentage: 'flakinessPercentage',
  mutedDays: 'mutedDays',
  numberOfAlwaysFailingTests: 'numberOfAlwaysFailingTests'
};

export const ALERT_TYPES_INFO = {
  [ALERT_TYPES.buildPerformance]: {
    label: 'Build Performance',
    desc: 'Passing tests as a percentage of all tests in a build',
    suffix: ' seconds',
    placeholder_text: 'Build duration (in seconds)',
    alert_condition_text:
      "Specify the build duration (in seconds) threshold over which you'd like to be alerted. We recommend you to set both the critical and warning thresholds."
  },
  [ALERT_TYPES.buildStability]: {
    label: 'Build stability',
    desc: 'Threshold for build duration',
    suffix: '%',
    placeholder_text: 'Build stability (%)',
    alert_condition_text:
      'Build Stability is the percentage total number of passing test cases (final status after re-runs, if applicable) out of test cases that ran in a build.'
  },
  [ALERT_TYPES.spanOfAlwaysFailingTests]: {
    label: 'Span of always failing tests',
    desc: 'Threshold for days a single test can be always failing',
    suffix: ' days',
    placeholder_text: 'Number of days',
    alert_condition_text:
      'Set this alert to be notified of stale tests that are failing since the number of days set as threshold.'
  },
  [ALERT_TYPES.flakinessPercentage]: {
    label: 'Flakiness percentage',
    desc: 'Threshold for the percentage of flaky tests allowed in a build run',
    suffix: '%',
    placeholder_text: 'Percentage of flaky tests',
    alert_condition_text:
      "Flakiness percentage is the percent of overall tests that you'd allow to be flaky tests in your builds."
  },
  [ALERT_TYPES.mutedDays]: {
    label: 'Muted days',
    desc: 'Threshold number of days that a test can remain muted',
    suffix: ' days',
    placeholder_text: 'Muted since (no. of days)',
    alert_condition_text:
      'Set the number of days upto which you want to allow certain tests to remain muted and not appear in overall build results.'
  },
  [ALERT_TYPES.numberOfAlwaysFailingTests]: {
    label: 'Number of always failing tests',
    desc: 'Threshold number of always failing tests allowed in a build',
    suffix: '',
    placeholder_text: 'Number of always failing tests',
    alert_condition_text: `Set the number of acceptable "Always failing" tests beyond which you'd like to be alerted. Always failing tests are tests that have not passed since the last 5 runs.`
  }
};

export const ALERT_LEVELS = {
  WARNING: 'WARNING',
  CRITICAL: 'CRITICAL'
};
export const ALERT_CONDITION_MAP = {
  LESS_THAN_EQUAL: {
    formLabel: '< Less than',
    tableText: 'Below'
  },
  GREATER_THAN_EQUAL: {
    formLabel: '> Greater than',
    tableText: 'Above'
  }
};

// const ALERT_TYPE_CONDITION_MAP = {
//   [ALERT_TYPES.buildStability]: {
//     value_type: 'Percentage',
//     condition: '< LESS THAN',
//     condition_text: 'Stability (%)',
//     placeholder_text: 'Build stability (%)',
//     alert_condition_text:
//       'Build Stability is the percentage total number of passing test cases (final status after re-runs, if applicable) out of test cases that ran in a build.'
//   },
//   [ALERT_TYPES.buildPerformance]: {
//     value_type: 'Seconds',
//     condition: '> GREATER THAN',
//     condition_text: 'Performance (s)',
//     placeholder_text: 'Build duration (in seconds)',
//     alert_condition_text:
//       "Specify the build duration (in seconds) threshold over which you'd like to be alerted. We recommend you to set both the critical and warning thresholds."
//   },
//   [ALERT_TYPES.flakinessPercentage]: {
//     value_type: 'Percentage',
//     condition: '> GREATER THAN',
//     condition_text: 'Flakiness (%)',
//     placeholder_text: 'Percentage of flaky tests',
//     alert_condition_text:
//       "Flakiness percentage is the percent of overall tests that you'd allow to be flaky tests in your builds."
//   },
//   [ALERT_TYPES.mutedDays]: {
//     value_type: 'Days',
//     condition: '> GREATER THAN',
//     condition_text: 'Days (d)',
//     placeholder_text: 'Muted since (no. of days)',
//     alert_condition_text:
//       'Set the number of days upto which you want to allow certain tests to remain muted and not appear in overall build results.'
//   },
//   [ALERT_TYPES.numberOfAlwaysFailingTests]: {
//     value_type: 'Percentage',
//     condition: '> GREATER THAN',
//     condition_text: 'Number (count)',
//     placeholder_text: 'Number of always failing tests',
//     alert_condition_text: `Set the number of acceptable "Always failing" tests beyond which you'd like to be alerted. Always failing tests are tests that have not passed since the last 5 runs.`
//   },
//   [ALERT_TYPES.spanOfAlwaysFailingTests]: {
//     value_type: 'Days',
//     condition: '> GREATER THAN',
//     condition_text: 'Span (d)',
//     placeholder_text: 'Number of days',
//     alert_condition_text:
//       'Set this alert to be notified of stale tests that are failing since the number of days set as threshold.'
//   }
// };
