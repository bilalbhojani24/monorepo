export const FILTER_CATEGORIES = {
  SUITE_HEALTH_TESTS: 'suite_health_tests',
  SUITE_HEALTH_UNIQUE_ERRORS: 'suite_health_unique_errors'
};

export const ADV_FILTER_OPERATIONS = {
  ADD: 'ADD',
  REMOVE_BY_ID: 'REMOVE_BY_ID',
  REMOVE_BY_TYPE: 'REMOVE_BY_TYPE',
  REPLACE_BY_TYPE: 'REPLACE_BY_TYPE'
};

export const ADV_FILTER_TYPES = {
  buildTags: {
    key: 'buildTags',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  uniqueBuildNames: {
    key: 'uniqueBuildNames',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  folder: {
    key: 'folder',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  testTags: {
    key: 'testTags',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  hostName: {
    key: 'hostName',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  isFlaky: {
    key: 'isFlaky',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  isNewFailure: {
    key: 'isNewFailure',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  isAlwaysFailing: {
    key: 'isAlwaysFailing',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  hasJiraDefects: {
    key: 'hasJiraDefects',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  isMuted: {
    key: 'isMuted',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  failureCategories: {
    key: 'failureCategories',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  device: {
    key: 'device',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  os: {
    key: 'os',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  browser: {
    key: 'browser',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_ID
  },
  search: {
    key: 'search',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  },
  dateRange: {
    key: 'dateRange',
    addOperation: ADV_FILTER_OPERATIONS.ADD,
    removeOperation: ADV_FILTER_OPERATIONS.REMOVE_BY_TYPE
  }
};

export const ADV_FILTERS_PREFIX = {
  [ADV_FILTER_TYPES.buildTags.key]: 'Build Tags',
  [ADV_FILTER_TYPES.uniqueBuildNames.key]: 'Unique Build Names',
  [ADV_FILTER_TYPES.folder.key]: 'Folder',
  [ADV_FILTER_TYPES.testTags.key]: 'Test Tags',
  [ADV_FILTER_TYPES.hostName.key]: 'Host name',
  [ADV_FILTER_TYPES.isFlaky.key]: 'Is Flaky',
  [ADV_FILTER_TYPES.isNewFailure.key]: 'Is New Failure',
  [ADV_FILTER_TYPES.isAlwaysFailing.key]: 'Is Always Failing',
  [ADV_FILTER_TYPES.hasJiraDefects.key]: 'Has JIRA Defects',
  [ADV_FILTER_TYPES.isMuted.key]: 'Is Muted',
  [ADV_FILTER_TYPES.failureCategories.key]: 'Failure Categories',
  [ADV_FILTER_TYPES.device.key]: 'Device',
  [ADV_FILTER_TYPES.os.key]: 'OS',
  [ADV_FILTER_TYPES.browser.key]: 'Browser',
  [ADV_FILTER_TYPES.search.key]: 'Search',
  [ADV_FILTER_TYPES.dateRange.key]: 'Date Range'
};
