export const EMPTY_SELECTED_FILTERS = {
  statuses: [],
  users: [],
  tags: [],
  frameworks: [],
  dateRange: {
    lowerBound: '',
    upperBound: ''
  }
};

export const EMPTY_APPLIED_FILTERS = {
  ...EMPTY_SELECTED_FILTERS,
  searchText: ''
};

export const TEST_LIST_FILTERS_INTERACTIONS = {
  isAlwaysFailing: 'always_failing_clicked',
  isPerformanceAnomaly: 'performance_anomaly_clicked',
  flaky: 'flaky_clicked',
  isNewFailure: 'new_failure_clicked',
  failed: 'failed_clicked',
  passed: 'passed_clicked',
  skipped: 'skipped_clicked',
  unknown: 'unknown_clicked',
  'To be Investigated': 'to_be_investigated_clicked',
  'Automation Bug': 'automation_bug_clicked',
  'Product Bug': 'product_bug_clicked',
  'No Defect': 'no_defect_clicked',
  'Environment Issue': 'environment_issue_clicked'
};

export const EMPTY_METADATA_FILTERS = {
  allUsers: [],
  staticFilters: []
};

export const aggregateColors = {
  'Automation Bug': '#FFC33B',
  'Environment Issue': '#76C6D8',
  'No Defect': '#5672D3',
  'Product Bug': '#E78D47',
  'To be Investigated': '#D5CDC7'
};

export const TABLE_CLASSES = {
  HEADER_COMMON: 'h-10 border-t border-base-300 text-xs font-medium z-[1] py-0',
  ROW_CLASSES:
    'overflow-hidden border-b border-base-300 whitespace-normal break-words',
  COL: {
    BUILD: 'border-l border-base-300',
    TEST: 'w-56 text-right',
    DURATION: 'w-24 text-center',
    FAILURE_CATEGORY: 'w-[164px] text-center border-r border-base-300',
    SMART_TAGS: 'w-48'
  }
};

export const BUILD_FILTER_TYPES = {
  buildName: 'buildNames',
  users: 'users',
  dateRange: 'dateRange',
  tags: 'tags',
  status: 'statuses',
  framework: 'frameworks',
  search: 'search',
  isArchived: 'isArchived'
};

export const FILTER_LABEL_MAPPING = {
  [BUILD_FILTER_TYPES.status]: 'Status',
  [BUILD_FILTER_TYPES.framework]: 'Framework',
  [BUILD_FILTER_TYPES.users]: 'User',
  [BUILD_FILTER_TYPES.tags]: 'Tag',
  [BUILD_FILTER_TYPES.isArchived]: 'Show archived builds only'
};
export const BUILD_FILTER_OPERATIONS = {
  ADD: 'ADD',
  REMOVE_BY_ID: 'REMOVE_BY_ID',
  REMOVE_BY_TYPE: 'REMOVE_BY_TYPE',
  REPLACE_BY_TYPE: 'REPLACE_BY_TYPE'
};

export const BUILD_FILTERS_PREFIX = {
  [BUILD_FILTER_TYPES.buildName]: 'Build Name',
  [BUILD_FILTER_TYPES.users]: 'User',
  [BUILD_FILTER_TYPES.dateRange]: 'Date Range',
  [BUILD_FILTER_TYPES.tags]: 'Tag',
  [BUILD_FILTER_TYPES.status]: 'Status',
  [BUILD_FILTER_TYPES.framework]: 'Framework',
  [BUILD_FILTER_TYPES.search]: 'Search',
  [BUILD_FILTER_TYPES.isArchived]: 'Show Archived Only'
};
