import { getSubtractedUnixTime } from 'utils/dateTime';

export const TT_PARAMS_MAPPING = {
  ttDateRange: 'tt_date_range',
  ttFromDate: 'tt_from',
  ttToDate: 'tt_to',
  ttActiveBuild: 'tt_active_build',
  ttActiveFrequency: 'tt_active_fq'
};

export const TT_DATE_RANGE = {
  days7: {
    label: '7D',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(7) * 1000
    }
  },
  days30: {
    label: '30D',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(30) * 1000
    }
  },
  months2: {
    label: '2M',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(2, 'month') * 1000
    }
  }
};

export const TREND_CARDS = {
  latestUniqueBuildRuns: {
    title: 'Latest Unique Build Runs'
  },
  alwaysFailing: {
    title: 'Always Failing'
  },
  newFailures: {
    title: 'New Failures'
  },
  flakiness: {
    title: 'Flakiness'
  },
  failureCategories: {
    title: 'Failure Categories'
  },
  stability: {
    title: 'Stability'
  },
  performance: {
    title: 'Performance'
  },
  buildRunFrequency: {
    title: 'Build Run Frequency'
  },
  testGrowthOverTime: {
    title: 'Unique Test Cases'
  },
  testExecutions: {
    title: 'Test executions'
  },
  // parallelExecutions: {
  //   title: 'Parallel Executions'
  // },
  cbt: {
    title: 'Cross Browser Testing'
  }
};

export const TREND_CARDS_LAYOUT = {
  md: [
    { w: 10, h: 3, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 10, minH: 3 },
    { w: 10, h: 3, x: 0, y: 3, i: 'stability', minW: 5, minH: 3 },
    { w: 10, h: 3, x: 0, y: 6, i: 'performance', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 12, i: 'alwaysFailing', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 15, i: 'buildRunFrequency', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 18, i: 'cbt', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 21, i: 'parallelExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 9, i: 'failureCategories', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 12, i: 'newFailures', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 15, i: 'testGrowthOverTime', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 18, i: 'testExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 9, i: 'flakiness', minW: 5, minH: 3 }
  ],
  lg: [
    { w: 10, h: 3, x: 0, y: 0, i: 'latestUniqueBuildRuns', minW: 10, minH: 3 },
    { w: 10, h: 3, x: 0, y: 3, i: 'stability', minW: 10, minH: 3 },
    { w: 10, h: 3, x: 0, y: 6, i: 'performance', minW: 10, minH: 3 },
    { w: 5, h: 3, x: 0, y: 12, i: 'alwaysFailing', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 15, i: 'buildRunFrequency', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 18, i: 'cbt', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 21, i: 'parallelExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 0, y: 9, i: 'failureCategories', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 12, i: 'newFailures', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 15, i: 'testGrowthOverTime', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 18, i: 'testExecutions', minW: 5, minH: 3 },
    { w: 5, h: 3, x: 5, y: 9, i: 'flakiness', minW: 5, minH: 3 }
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
