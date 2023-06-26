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
  'Automation Bug': '#65B3B1',
  'Environment Issue': '#ECCF5C',
  'No Defect': '#BC9874',
  'Product Bug': '#286E9A',
  'To be Investigated': '#748794'
};

export const TABLE_CLASSES = {
  HEADER_COMMON: 'py-3 border-t border-base-300 text-xs font-medium z-[1]',
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

export const FILTER_LABEL_MAPPING = {
  statuses: 'Status',
  frameworks: 'Framework',
  users: 'User',
  tags: 'Tag'
};

export const BUILD_FILTER_TYPES = {
  buildName: 'buildNames',
  users: 'users',
  dateRange: 'dateRange',
  tags: 'tags',
  status: 'statuses',
  framework: 'frameworks',
  search: 'search'
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
  [BUILD_FILTER_TYPES.search]: 'Search'
};
