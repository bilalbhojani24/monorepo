export const TABS_KEY_MAPPING = {
  tests: 'tests',
  unique_errors: 'unique_errors'
};
export const TABS = {
  [TABS_KEY_MAPPING.tests]: 'Tests',
  [TABS_KEY_MAPPING.unique_errors]: 'Unique Errors'
};

export const TESTS_HEADER_LABEL_MAPPING = {
  tests: 'Tests',
  platforms: 'Platforms',
  totalFailures: 'Failure Count',
  reliability: 'Failure Rate',
  average: 'Avg. Duration'
};

const SUITE_TESTS_HEADER_SIMILAR_CLASS = 'text-center w-36';

export const SUITE_TESTS_HEADER_LABEL_MAPPING = {
  tests: {
    name: TESTS_HEADER_LABEL_MAPPING.tests,
    defaultClass: 'pl-6 min-w-[460px] whitespace-normal'
  },
  platforms: {
    name: TESTS_HEADER_LABEL_MAPPING.platforms,
    defaultClass: SUITE_TESTS_HEADER_SIMILAR_CLASS
  },
  totalFailures: {
    name: TESTS_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: SUITE_TESTS_HEADER_SIMILAR_CLASS
  },
  reliability: {
    name: TESTS_HEADER_LABEL_MAPPING.reliability,
    defaultClass: 'text-center w-32'
  },
  average: {
    name: TESTS_HEADER_LABEL_MAPPING.average,
    defaultClass: SUITE_TESTS_HEADER_SIMILAR_CLASS
  }
};

export const UNIQUE_ERROR_MAIN_HEADER = {
  error: {
    key: 'error',
    label: 'Error',
    headerClass: 'py-2 flex-1 min-w-[460px]',
    bodyClass: 'w-[460px] flex-1'
  },
  testCount: {
    key: 'testCount',
    label: 'Impacted tests',
    headerClass: 'py-2 pl-4 hover:bg-base-200 w-36',
    bodyClass: 'pl-4 pr-4 sm:pr-6 w-36'
  },
  errorCount: {
    key: 'errorCount',
    label: 'Error count',
    headerClass: 'py-2 sm:pr-6 pl-4 hover:bg-base-200 w-40',
    bodyClass: 'pl-4 w-40'
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
    label: 'Platforms',
    headerClass:
      'uppercase w-36 text-base-500 text-xs font-medium leading-4 py-3 pl-4 pr-6 text-center',
    bodyClass: 'w-36 py-4 pl-4 pr-6 text-sm'
  },
  errorCount: {
    key: 'errorCount',
    label: 'Error count',
    headerClass:
      'uppercase w-40 text-base-500 text-xs font-medium leading-4 py-3 pl-4',
    bodyClass: 'w-40 py-4 pl-4 text-sm'
  }
};
