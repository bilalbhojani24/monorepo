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

export const SUITE_TESTS_HEADER_LABEL_MAPPING = {
  tests: {
    name: TESTS_HEADER_LABEL_MAPPING.tests,
    defaultClass: 'pl-6 min-w-[460px] whitespace-normal'
  },
  platforms: {
    name: TESTS_HEADER_LABEL_MAPPING.platforms,
    defaultClass: 'w-[300px]'
  },
  totalFailures: {
    name: TESTS_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: 'text-center w-[135px]'
  },
  reliability: {
    name: TESTS_HEADER_LABEL_MAPPING.reliability,
    defaultClass: 'text-center w-[120px]'
  },
  average: {
    name: TESTS_HEADER_LABEL_MAPPING.average,
    defaultClass: 'text-center w-[135px]'
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
      'uppercase w-[140px] text-base-500 text-xs font-medium leading-4 py-3 pl-6',
    bodyClass: 'w-[140px] py-4 pl-6 text-sm'
  }
};
