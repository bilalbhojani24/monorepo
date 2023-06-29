/* eslint-disable sonarjs/no-duplicate-string */
import { DOC_KEY_MAPPING } from 'constants/common';
import { ROUTE_PATH_KEYS } from 'constants/routes';

export const cards = {
  buildSummary: {
    title: 'Build Summary',
    tooltipText:
      'Summary of all test cases or BDD scenarios and their status in the run.'
  },
  buildHistory: {
    title: 'Build History',
    tooltipText: 'Summary of this build across last 10 runs.'
  },
  alerts: {
    title: 'Alerts',
    tooltipText: 'Configure multiple alerts on important quality metrics.'
  },
  alwaysFailing: {
    title: 'Always failing',
    showMore: true,
    tooltipText: 'Number of tests that have been failing consistently.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'AlwaysFailingTooltipCTAClicked'
  },
  newFailures: {
    title: 'New failures',
    showMore: true,
    tooltipText:
      'Number of tests that have failed for the first time in a while.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'NewFailuresTooltipCTAClicked'
  },
  buildStability: {
    title: 'Build stability',
    showMore: true,
    tooltipText:
      'Stability trends of the build signifying the passing rate of tests run in a build.'
  },
  flakiness: {
    title: 'Flakiness',
    showMore: true,
    tooltipText: 'Number of flaky tests in this run as per definition.',
    cta: 'Configure',
    ctaUrl: ROUTE_PATH_KEYS.settings_smart_tags,
    isInternalLink: true,
    trackingData: 'FlakinessTooltipCTAClicked'
  },
  mutedTests: {
    minH: 1,
    title: 'Muted tests',
    tooltipText: 'Number of tests that are in muted state.',
    cta: 'Learn more',
    ctaUrl: DOC_KEY_MAPPING.mute,
    isDocUrl: true,
    trackingData: 'MutedTestsTooltipCTAClicked'
  },
  failureCategories: {
    title: 'Failure Categories',
    showMore: true,
    tooltipText:
      'Machine Learning based automatic categorization of test failures.',
    cta: 'Learn more',
    ctaUrl: DOC_KEY_MAPPING.auto_analyser,
    isDocUrl: true,
    trackingData: 'FailureCategoryTooltipCTAClicked'
  },
  reRunSummary: {
    title: 'Run Summary',
    tooltipText:
      'Summary of all the runs clubbed in this build. It includes all re-runs and merged runs triggered from multiple CI machines. Learn more about merging multiple runs and creating one single report.',
    cta: 'Learn more',
    ctaUrl: DOC_KEY_MAPPING.re_run,
    isDocUrl: true,
    trackingData: 'RunSummaryTooltipCTAClicked'
  },
  topErrors: {
    title: 'Unique Errors',
    tooltipText:
      'Automatic analysis of unique errors responsible for overall test failures. Use this widget to bulk-tag failure categories for common-cause test failures.'
  },
  failuresByFolders: {
    title: 'Failures by Folders',
    tooltipText:
      'Drilldown-able heatmap of different folders/modules in the test suite showing failure rate. Size of a folder represents the number of tests inside it.'
  }
};

export const layoutConfig = {
  md: [
    { w: 1, h: 4, x: 0, y: 0, i: 'buildSummary', minW: 1, minH: 4 },
    { w: 2, h: 3, x: 2, y: 0, i: 'buildHistory', minW: 2, minH: 3 },
    { w: 2, h: 2, x: 2, y: 3, i: 'alerts', minW: 2, minH: 2 },
    { w: 1, h: 1, x: 1, y: 3, i: 'alwaysFailing', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 2, i: 'newFailures', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 2, y: 5, i: 'buildStability', minW: 2, minH: 3 },
    { w: 1, h: 1, x: 1, y: 0, i: 'flakiness', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 1, i: 'mutedTests', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 2, y: 8, i: 'failureCategories', minW: 2, minH: 2 },
    { w: 2, h: 3, x: 0, y: 9, i: 'reRunSummary', minW: 2, minH: 3 },
    { w: 2, h: 5, x: 0, y: 4, i: 'topErrors', minW: 2, minH: 5 },
    { w: 2, h: 3, x: 2, y: 10, i: 'failuresByFolders', minW: 2, minH: 3 }
  ],
  lg: [
    { w: 1, h: 4, x: 0, y: 0, i: 'buildSummary', minW: 1, minH: 4 },
    { w: 2, h: 3, x: 2, y: 0, i: 'buildHistory', minW: 2, minH: 3 },
    { w: 2, h: 2, x: 2, y: 3, i: 'alerts', minW: 2, minH: 2 },
    { w: 1, h: 1, x: 1, y: 0, i: 'alwaysFailing', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 1, i: 'newFailures', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 2, y: 5, i: 'buildStability', minW: 2, minH: 3 },
    { w: 1, h: 1, x: 1, y: 2, i: 'flakiness', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 3, i: 'mutedTests', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 2, y: 8, i: 'failureCategories', minW: 2, minH: 2 },
    { w: 2, h: 3, x: 0, y: 9, i: 'reRunSummary', minW: 2, minH: 3 },
    { w: 2, h: 5, x: 0, y: 4, i: 'topErrors', minW: 2, minH: 5 },
    { w: 2, h: 3, x: 2, y: 10, i: 'failuresByFolders', minW: 2, minH: 3 }
  ],
  sm: [
    { w: 2, h: 3, x: 0, y: 0, i: 'buildSummary', minW: 2, minH: 3 },
    { w: 2, h: 2, x: 0, y: 3, i: 'buildHistory', minW: 2, minH: 2 },
    { w: 2, h: 2, x: 0, y: 5, i: 'alerts', minW: 2, minH: 2 },
    { w: 1, h: 1, x: 0, y: 7, i: 'alwaysFailing', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 7, i: 'newFailures', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 0, y: 9, i: 'buildStability', minW: 2, minH: 3 },
    { w: 1, h: 1, x: 0, y: 8, i: 'flakiness', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 8, i: 'mutedTests', minW: 1, minH: 1 },
    { w: 2, h: 2, x: 0, y: 12, i: 'failureCategories', minW: 2, minH: 2 },
    { w: 2, h: 3, x: 0, y: 14, i: 'reRunSummary', minW: 2, minH: 3 },
    { w: 2, h: 4, x: 0, y: 17, i: 'topErrors', minW: 2, minH: 4 },
    { w: 2, h: 3, x: 0, y: 21, i: 'failuresByFolders', minW: 2, minH: 3 }
  ],
  xs: [
    { w: 2, h: 3, x: 0, y: 0, i: 'buildSummary', minW: 2, minH: 3 },
    { w: 2, h: 2, x: 0, y: 3, i: 'buildHistory', minW: 2, minH: 2 },
    { w: 2, h: 2, x: 0, y: 5, i: 'alerts', minW: 2, minH: 2 },
    { w: 1, h: 1, x: 0, y: 7, i: 'alwaysFailing', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 7, i: 'newFailures', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 0, y: 9, i: 'buildStability', minW: 2, minH: 3 },
    { w: 1, h: 1, x: 0, y: 8, i: 'flakiness', minW: 1, minH: 1 },
    { w: 1, h: 1, x: 1, y: 8, i: 'mutedTests', minW: 1, minH: 1 },
    { w: 2, h: 2, x: 0, y: 12, i: 'failureCategories', minW: 2, minH: 2 },
    { w: 2, h: 3, x: 0, y: 19, i: 'reRunSummary', minW: 2, minH: 3 },
    { w: 2, h: 5, x: 0, y: 14, i: 'topErrors', minW: 2, minH: 5 },
    { w: 2, h: 3, x: 0, y: 23, i: 'failuresByFolders', minW: 2, minH: 3 }
  ],
  xxs: [
    { w: 2, h: 3, x: 0, y: 0, i: 'buildSummary', minW: 2, minH: 3 },
    { w: 2, h: 2, x: 0, y: 3, i: 'buildHistory', minW: 2, minH: 2 },
    { w: 2, h: 2, x: 0, y: 5, i: 'alerts', minW: 2, minH: 2 },
    { w: 2, h: 1, x: 0, y: 7, i: 'alwaysFailing', minW: 1, minH: 1 },
    { w: 2, h: 1, x: 0, y: 8, i: 'newFailures', minW: 1, minH: 1 },
    { w: 2, h: 3, x: 0, y: 11, i: 'buildStability', minW: 2, minH: 3 },
    { w: 2, h: 1, x: 0, y: 9, i: 'flakiness', minW: 1, minH: 1 },
    { w: 2, h: 1, x: 0, y: 10, i: 'mutedTests', minW: 1, minH: 1 },
    { w: 2, h: 2, x: 0, y: 14, i: 'failureCategories', minW: 2, minH: 2 },
    { w: 2, h: 3, x: 0, y: 20, i: 'reRunSummary', minW: 2, minH: 3 },
    { w: 2, h: 4, x: 0, y: 16, i: 'topErrors', minW: 2, minH: 4 },
    { w: 2, h: 3, x: 0, y: 23, i: 'failuresByFolders', minW: 2, minH: 3 }
  ]
};
