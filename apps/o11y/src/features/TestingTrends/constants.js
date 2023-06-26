import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTE_PATH_KEYS } from 'constants/routes';

export const TT_PARAMS_MAPPING = {
  ttDateRange: 'tt_date_range',
  ttFromDate: 'tt_from',
  ttToDate: 'tt_to',
  ttActiveBuild: 'tt_active_build',
  ttActiveFrequency: 'tt_active_fq'
};

export const TT_DATE_RANGE = {
  days7: {
    key: 'days7',
    label: '7D'
  },
  days30: {
    key: 'days30',
    label: '30D'
  },
  months2: {
    key: 'months2',
    label: '2M'
  },
  custom: {
    key: 'custom',
    label: 'Custom'
  }
};

export const TREND_CARDS = {
  latestUniqueBuildRuns: {
    title: 'Latest Unique Build Runs',
    tooltipText:
      'Summary of the latest run of all different unique build names in this project (always shows latest runs ignoring the time range filter above).',
    cta: 'View all runs',
    ctaUrl: ROUTE_PATH_KEYS.builds,
    isInternalLink: true,
    trackingData: 'UniqueRunTooltipCTAClicked'
  },
  alwaysFailing: {
    title: 'Always Failing',
    tooltipText:
      'Unique number of tests that have consistently failed for configured duration across the time range. A high value represents poor effectiveness of automation.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'AlwaysFailingTooltipCTAClicked'
  },
  newFailures: {
    title: 'New Failures',
    tooltipText:
      'Unique number of tests that have failed at least once across the time range. A high value represents suboptimal dev quality impacting a huge proportion of tests.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'NewFailuresTooltipCTAClicked'
  },
  flakiness: {
    title: 'Flakiness',
    tooltipText:
      'Trends of flaky test executions across the project in the given time range. A high value represents poor automation quality.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'FlakinessTooltipCTAClicked'
  },
  failureCategories: {
    title: 'Failure Categories',
    tooltipText:
      'Trends of different buckets of test failure categories as analyzed by the ML engine',
    cta: 'Lean how to use',
    ctaUrl: DOC_KEY_MAPPING.auto_analyser,
    isDocUrl: true,
    trackingData: 'FailureCategoryTooltipCTAClicked'
  },
  stability: {
    title: 'Stability',
    tooltipText:
      'Stability is defined as total passing test executions as a percentage of overall test executions in the project.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_alerts,
    isInternalLink: true,
    trackingData: 'StabilityTooltipCTAClicked'
  },
  performance: {
    title: 'Performance',
    tooltipText:
      'Columns represents the average duration of each build run for a particular build and the line shows the average number of tests executed on that build.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_alerts,
    isInternalLink: true,
    trackingData: 'PerformanceTooltipCTAClicked'
  },
  buildRunFrequency: {
    title: 'Build Run Frequency',
    tooltipText:
      'A quick snapshot of how frequently different build jobs are run in the given time range. A higher frequency represents better CI/CD maturity.',
    cta: 'View all runs',
    ctaUrl: ROUTE_PATH_KEYS.builds,
    isInternalLink: true,
    trackingData: 'BuildRunFrequencyTooltipCTAClicked'
  },
  testGrowthOverTime: {
    title: 'Unique Test Cases',
    tooltipText:
      'Trend represents the rate of growth of the unique number of test cases/scenarios. An upward trending graph represents more automation scenarios being added.',
    cta: 'View all unique tests',
    ctaUrl: ROUTE_PATH_KEYS.suite_health_tests,
    isInternalLink: true,
    trackingData: 'UniqueTestsTooltipCTAClicked'
  },
  testExecutions: {
    title: 'Test executions',
    tooltipText:
      'Represents the scale of automation testing. Trend can be used to forecast future scale of testing and progress made.',
    cta: 'View all tests',
    ctaUrl: ROUTE_PATH_KEYS.suite_health_tests,
    isInternalLink: true,
    trackingData: 'TestExecutionsTooltipCTAClicked'
  },
  // parallelExecutions: {
  //   title: 'Parallel Executions'
  // },
  cbt: {
    title: 'Cross Browser Testing',
    tooltipText:
      'Represents the cross-browser/device testing coverage in the project.',
    cta: 'View all tests',
    ctaUrl: ROUTE_PATH_KEYS.suite_health_tests,
    isInternalLink: true,
    trackingData: 'CrossBrowserTestingTooltipCTAClicked'
  }
};

export const TREND_CARDS_LAYOUT = {
  md: [
    { w: 5, h: 3, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 12, i: 'alwaysFailing', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 9, i: 'newFailures', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 0, i: 'flakiness', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 9, i: 'failureCategories', minW: 5, minH: 3 },
    { w: 10, h: 3, x: 0, y: 3, i: 'stability', minW: 5, minH: 3 },
    { w: 10, h: 3, x: 0, y: 6, i: 'performance', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 15, i: 'buildRunFrequency', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 12, i: 'testGrowthOverTime', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 15, i: 'testExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 18, i: 'cbt', minW: 5, minH: 3 }
  ],
  lg: [
    { w: 5, h: 3, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 12, i: 'alwaysFailing', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 9, i: 'newFailures', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 0, i: 'flakiness', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 9, i: 'failureCategories', minW: 5, minH: 3 },
    { w: 10, h: 3, x: 0, y: 3, i: 'stability', minW: 10, minH: 3 },
    { w: 10, h: 3, x: 0, y: 6, i: 'performance', minW: 10, minH: 3 },
    { w: 5, h: 3, x: 0, y: 15, i: 'buildRunFrequency', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 12, i: 'testGrowthOverTime', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 15, i: 'testExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 18, i: 'cbt', minW: 5, minH: 3 }
  ],
  sm: [
    { w: 1, h: 5, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 1, minH: 5 },
    { w: 1, h: 3, x: 0, y: 10, i: 'alwaysFailing', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 13, i: 'newFailures', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 5, i: 'flakiness', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 8, i: 'failureCategories', minW: 1, minH: 2 },
    { w: 1, h: 3, x: 0, y: 16, i: 'stability', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 19, i: 'performance', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 22, i: 'buildRunFrequency', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 25, i: 'testGrowthOverTime', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 28, i: 'testExecutions', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 32, i: 'cbt', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 36, i: 'parallelExecutions', minW: 1, minH: 3 }
  ],
  xs: [
    { w: 1, h: 5, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 1, minH: 5 },
    { w: 1, h: 3, x: 0, y: 10, i: 'alwaysFailing', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 13, i: 'newFailures', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 5, i: 'flakiness', minW: 1, minH: 3 },
    { w: 1, h: 2, x: 0, y: 8, i: 'failureCategories', minW: 1, minH: 2 },
    { w: 1, h: 3, x: 0, y: 16, i: 'stability', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 19, i: 'performance', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 22, i: 'buildRunFrequency', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 25, i: 'testGrowthOverTime', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 28, i: 'testExecutions', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 32, i: 'cbt', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 36, i: 'parallelExecutions', minW: 1, minH: 3 }
  ],
  xxs: [
    { w: 1, h: 5, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 1, minH: 5 },
    { w: 1, h: 3, x: 0, y: 10, i: 'alwaysFailing', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 13, i: 'newFailures', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 5, i: 'flakiness', minW: 1, minH: 3 },
    { w: 1, h: 2, x: 0, y: 8, i: 'failureCategories', minW: 1, minH: 2 },
    { w: 1, h: 3, x: 0, y: 16, i: 'stability', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 19, i: 'performance', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 22, i: 'buildRunFrequency', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 25, i: 'testGrowthOverTime', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 28, i: 'testExecutions', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 32, i: 'cbt', minW: 1, minH: 3 },
    { w: 1, h: 3, x: 0, y: 36, i: 'parallelExecutions', minW: 1, minH: 3 }
  ]
};
