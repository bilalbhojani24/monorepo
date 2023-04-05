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

const BUILDS_HEADER_COMMON_STYLES = 'py-3 text-base-500 text-sm leading-4';

export const BUILDS_HEADER_COLUMN_STYLE_MAPPING = {
  buildName: {
    name: BUILDS_HEADER_LABEL_MAPPING.buildName,
    defaultClass:
      'w-7/12 py-3 whitespace-normal !pl-0 text-base-500 text-sm leading-4'
  },
  testStatus: {
    name: BUILDS_HEADER_LABEL_MAPPING.testStatus,
    defaultClass: BUILDS_HEADER_COMMON_STYLES
  },
  testDuration: {
    name: BUILDS_HEADER_LABEL_MAPPING.testDuration,
    defaultClass: BUILDS_HEADER_COMMON_STYLES
  },
  tags: {
    name: BUILDS_HEADER_LABEL_MAPPING.tags,
    defaultClass: `!pr-0 ${BUILDS_HEADER_COMMON_STYLES}`
  }
};

export const PLATFORM_HEADER_LABEL_MAPPING = {
  platforms_combinations: 'Platforms combinations',
  totalFailures: 'Failure Count',
  reliability: 'Failure Rate',
  average: 'Avg. Duration'
};

const PLATFORM_HEADER_COMMON_STYLES =
  'py-3 uppercase text-base-500 text-sm leading-5';

export const PLATFORM_HEADER_CELLS_MAPPING = {
  platforms_combinations: {
    name: PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations,
    defaultClass: 'w-7/12 whitespace-normal py-3 uppercase'
  },
  totalFailures: {
    name: PLATFORM_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: PLATFORM_HEADER_COMMON_STYLES
  },
  reliability: {
    name: PLATFORM_HEADER_LABEL_MAPPING.reliability,
    defaultClass: PLATFORM_HEADER_COMMON_STYLES
  },
  average: {
    name: PLATFORM_HEADER_LABEL_MAPPING.average,
    defaultClass: PLATFORM_HEADER_COMMON_STYLES
  }
};

export const SH_TEST_DETAIL_CUSTOM_SCROLL_PARENT_ID =
  'sh-test-details-scroll-parent';
