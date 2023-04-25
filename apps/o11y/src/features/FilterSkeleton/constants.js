export const FILTER_CATEGORIES = {
  SUITE_HEALTH_TESTS: 'suite_health_tests',
  SUITE_HEALTH_UNIQUE_ERRORS: 'suite_health_unique_errors'
};

export const ADV_FILTER_TYPES = {
  buildTags: 'buildTags',
  uniqueBuildNames: 'uniqueBuildNames',
  folder: 'folder',
  testTags: 'testTags',
  hostName: 'hostName',
  isFlaky: 'isFlaky',
  isNewFailure: 'isNewFailure',
  isAlwaysFailing: 'isAlwaysFailing',
  hasJiraDefects: 'hasJiraDefects',
  isMuted: 'isMuted',
  failureCategories: 'failureCategories',
  device: 'device',
  os: 'os',
  browser: 'browser',
  search: 'search',
  dateRange: 'dateRange'
};
export const ADV_FILTER_OPERATIONS = {
  ADD: 'ADD',
  REMOVE_BY_ID: 'REMOVE_BY_ID',
  REMOVE_BY_TYPE: 'REMOVE_BY_TYPE',
  REPLACE_BY_TYPE: 'REPLACE_BY_TYPE'
};

export const ADV_FILTERS_PREFIX = {
  [ADV_FILTER_TYPES.buildTags]: 'Build Tags',
  [ADV_FILTER_TYPES.uniqueBuildNames]: 'Unique Build Names',
  [ADV_FILTER_TYPES.folder]: 'Folder',
  [ADV_FILTER_TYPES.testTags]: 'Test Tags',
  [ADV_FILTER_TYPES.hostName]: 'Host name',
  [ADV_FILTER_TYPES.isFlaky]: 'Is Flaky',
  [ADV_FILTER_TYPES.isNewFailure]: 'Is New Failure',
  [ADV_FILTER_TYPES.isAlwaysFailing]: 'Is Always Failing',
  [ADV_FILTER_TYPES.hasJiraDefects]: 'Has JIRA Defects',
  [ADV_FILTER_TYPES.isMuted]: 'Is Muted',
  [ADV_FILTER_TYPES.failureCategories]: 'Failure Categories',
  [ADV_FILTER_TYPES.device]: 'Device',
  [ADV_FILTER_TYPES.os]: 'OS',
  [ADV_FILTER_TYPES.browser]: 'Browser',
  [ADV_FILTER_TYPES.search]: 'Search',
  [ADV_FILTER_TYPES.dateRange]: 'Date Range'
};
