export const cards = {
  buildSummary: {
    title: 'Build Summary'
  },
  buildHistory: {
    title: 'Build History'
  },
  alerts: {
    title: 'Alerts'
  },
  alwaysFailing: {
    title: 'Always failing',
    showMore: true
  },
  newFailures: {
    title: 'New failures',
    showMore: true
  },
  buildStability: {
    title: 'Build stability',
    showMore: true
  },
  flakiness: {
    title: 'Flakiness',
    showMore: true
  },
  mutedTests: {
    minH: 1,
    title: 'Muted tests'
  },
  failureCategories: {
    title: 'Failure Categories',
    showMore: true
  },
  reRunSummary: {
    title: 'Re-run Summary'
  },
  topErrors: {
    title: 'Unique Errors'
  },
  failuresByFolders: {
    title: 'Failures by Folders'
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
