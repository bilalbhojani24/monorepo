export const TABS = {
  platforms: 'Platforms',
  runs: 'Runs'
};

export const SH_UE_DETAILS_CUSTOM_SCROLL_PARENT_ID =
  'sh-ue-details-scroll-parent';

export const PLATFORM_HEADER_LABEL_MAPPING = {
  platforms_combinations: 'Platform Combinations',
  errorCount: 'Error Count',
  totalFailures: 'Total Failures'
};

export const PLATFORM_HEADER_CELLS_MAPPING = {
  platforms_combinations: {
    name: PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations,
    defaultClass: 'w-7/12 whitespace-normal py-3 uppercase'
  },
  errorCount: {
    name: PLATFORM_HEADER_LABEL_MAPPING.errorCount,
    defaultClass: 'py-3 uppercase'
  },
  totalFailures: {
    name: PLATFORM_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: 'py-3 uppercase'
  }
};

export const BUILDS_HEADER_LABEL_MAPPING = {
  buildName: 'Build Name',
  testStatus: 'Test Status',
  failureCategory: 'Failure Category',
  testDuration: 'Test Duration',
  tags: 'Tags'
};

const BUILDS_HEADER_COMMON_STYLES = 'py-3 text-base-500 text-sm leading-4';

export const BUILDS_HEADER_COLUMN_STYLE_MAPPING = {
  buildName: {
    name: BUILDS_HEADER_LABEL_MAPPING.buildName,
    defaultClass:
      'flex-1 py-3 whitespace-normal !pl-0 text-base-500 text-sm leading-4'
  },
  testStatus: {
    name: BUILDS_HEADER_LABEL_MAPPING.testStatus,
    defaultClass: `${BUILDS_HEADER_COMMON_STYLES} w-[100px]`
  },
  failureCategory: {
    name: BUILDS_HEADER_LABEL_MAPPING.failureCategory,
    defaultClass: `${BUILDS_HEADER_COMMON_STYLES} w-[170px]`
  },
  testDuration: {
    name: BUILDS_HEADER_LABEL_MAPPING.testDuration,
    defaultClass: `${BUILDS_HEADER_COMMON_STYLES} w-[100px]`
  },
  tags: {
    name: BUILDS_HEADER_LABEL_MAPPING.tags,
    defaultClass: `!pr-0 w-[100px] ${BUILDS_HEADER_COMMON_STYLES}`
  }
};
