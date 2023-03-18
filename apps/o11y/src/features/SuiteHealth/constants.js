export const TABS = {
  tests: 'Tests',
  unique_errors: 'Unique Errors',
  build_performance: 'Build Performance'
};

export const TESTS_HEADER_LABEL_MAPPING = {
  tests: 'Tests',
  platforms: 'Platforms',
  totalFailures: 'Failure Count',
  reliability: 'Failure Rate',
  average: 'Avg. Duration'
};

const ACTION_HEADER_COLUMN_CLASS = 'py-3 text-center';

export const SUITE_TESTS_HEADER_LABEL_MAPPING = {
  tests: {
    name: TESTS_HEADER_LABEL_MAPPING.tests,
    defaultClass: 'py-3 pl-6 w-2/4 whitespace-normal'
  },
  platforms: {
    name: TESTS_HEADER_LABEL_MAPPING.platforms,
    defaultClass: 'py-3 w-1/5'
  },
  totalFailures: {
    name: TESTS_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: ACTION_HEADER_COLUMN_CLASS
  },
  reliability: {
    name: TESTS_HEADER_LABEL_MAPPING.reliability,
    defaultClass: ACTION_HEADER_COLUMN_CLASS
  },
  average: {
    name: TESTS_HEADER_LABEL_MAPPING.average,
    defaultClass: ACTION_HEADER_COLUMN_CLASS
  }
};

export const UNIQUE_ERROR_MAIN_HEADER = {
  error: 'Error',
  testCount: 'Impacted tests',
  errorCount: 'Error count'
};

export const UNIQUE_ERROR_BREAKDOWN_HEADER = {
  platforms: 'Platforms',
  browsers: 'Browsers'
};
export const SUITE_HEALTH_TESTS_COLS = 6;
