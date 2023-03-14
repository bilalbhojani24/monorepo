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
