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
  [BUILDS_HEADER_LABEL_MAPPING.buildName]: {
    name: BUILDS_HEADER_LABEL_MAPPING.buildName,
    defaultClass: 'w-[500px] py-3 whitespace-normal'
  },
  [BUILDS_HEADER_LABEL_MAPPING.testStatus]: {
    name: BUILDS_HEADER_LABEL_MAPPING.testStatus,
    defaultClass: 'py-3'
  },
  [BUILDS_HEADER_LABEL_MAPPING.testDuration]: {
    name: BUILDS_HEADER_LABEL_MAPPING.testDuration,
    defaultClass: 'py-3'
  },
  [BUILDS_HEADER_LABEL_MAPPING.tags]: {
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
  [PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations]: {
    name: PLATFORM_HEADER_LABEL_MAPPING.platforms_combinations,
    defaultClass: 'w-[500px] whitespace-normal py-3'
  },
  [PLATFORM_HEADER_LABEL_MAPPING.totalFailures]: {
    name: PLATFORM_HEADER_LABEL_MAPPING.totalFailures,
    defaultClass: 'py-3'
  },
  [PLATFORM_HEADER_LABEL_MAPPING.reliability]: {
    name: PLATFORM_HEADER_LABEL_MAPPING.reliability,
    defaultClass: 'py-3'
  },
  [PLATFORM_HEADER_LABEL_MAPPING.average]: {
    name: PLATFORM_HEADER_LABEL_MAPPING.average,
    defaultClass: 'py-3'
  }
};
