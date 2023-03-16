export const BUILDS_HEADER_LABEL_MAPPING = {
  buildName: 'Build Name',
  testStatus: 'Test Status',
  testDuration: 'Test Duration',
  tags: 'Tags'
};

export const TABS = {
  platforms: 'Platforms',
  runs: 'Runs'
};

export const BUILDS_HEADER_COLUMN_STYLE_MAPPING = {
  buildName: {
    name: BUILDS_HEADER_LABEL_MAPPING.buildName,
    defaultClass: 'w-7/12 py-3 whitespace-normal'
  },
  testStatus: {
    name: BUILDS_HEADER_LABEL_MAPPING.testStatus,
    defaultClass: 'py-3'
  },
  testDuration: {
    name: BUILDS_HEADER_LABEL_MAPPING.testDuration,
    defaultClass: 'py-3'
  },
  tags: {
    name: BUILDS_HEADER_LABEL_MAPPING.tags,
    defaultClass: 'py-3'
  }
};

export const PLATFORM_HEADER_LABEL_MAPPING = {
  platforms_combinations: 'Platforms combinations',
  totalFailures: 'Failure Count',
  reliability: 'Failure Rate',
  average: 'Avg. Duration'
};

export const PLATFORM_HEADER_CELLS_MAPPING = {
  platforms_combinations: {
    name: PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations,
    defaultClass: 'w-7/12 whitespace-normal py-3'
  },
  totalFailures: {
    name: PLATFORM_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: 'py-3'
  },
  reliability: {
    name: PLATFORM_HEADER_LABEL_MAPPING.reliability,
    defaultClass: 'py-3'
  },
  average: {
    name: PLATFORM_HEADER_LABEL_MAPPING.average,
    defaultClass: 'py-3'
  }
};

export const SH_TEST_DETAIL_CUSTOM_SCROLL_PARENT_ID =
  'sh-test-details-scroll-parent';
