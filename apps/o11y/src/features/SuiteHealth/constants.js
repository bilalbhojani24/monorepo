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
  error: {
    key: 'error',
    label: 'Error',
    headerClass: 'py-2 flex-1 min-w-[460px]',
    bodyClass: 'py-3 min-w-[460px] flex-1'
  },
  testCount: {
    key: 'testCount',
    label: 'Impacted tests',
    headerClass: 'py-2 pl-4 hover:bg-base-200 w-[150px]',
    bodyClass: 'py-3 pl-4 pr-4 sm:pr-6 w-[150px]'
  },
  errorCount: {
    key: 'errorCount',
    label: 'Error count',
    headerClass: 'py-2 pr-4 sm:pr-6 pl-4 hover:bg-base-200 w-[150px]',
    bodyClass: 'py-3 pr-4 sm:pr-6 pl-4 w-[150px]'
  }
};

export const UNIQUE_ERROR_BREAKDOWN_HEADER = {
  tests: {
    key: 'tests',
    label: 'Tests',
    headerClass:
      'uppercase flex-1 min-w-[460px] text-base-500 text-xs font-medium leading-4 py-3',
    bodyClass: 'min-w-[460px] flex-1 py-4 text-sm'
  },
  platforms: {
    key: 'platforms',
    label: 'Impacted tests',
    headerClass:
      'uppercase w-[300px] text-base-500 text-xs font-medium leading-4 py-3 pl-6',
    bodyClass: 'w-[300px] py-4 pl-6 text-sm'
  },
  errorCount: {
    key: 'errorCount',
    label: 'Error count',
    headerClass:
      'uppercase w-[140px] text-base-500 text-xs font-medium leading-4 py-3 pr-6',
    bodyClass: 'w-[140px] py-4 pr-6 text-sm'
  }
};
