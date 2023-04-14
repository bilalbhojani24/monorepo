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
  HEADER_COMMON: 'py-3 border-t border-base-300 text-xs font-medium z-auto',
  ROW_CLASSES:
    'overflow-hidden border-b border-base-300 whitespace-normal break-words',
  COL: {
    BUILD: '',
    TEST: 'w-48 text-right',
    DURATION: 'w-24 text-center',
    FAILURE_CATEGORY: 'w-[164px] text-center',
    SMART_TAGS: 'w-48'
  }
};

export const FILTER_LABEL_MAPPING = {
  statuses: 'Status',
  frameworks: 'Framework',
  users: 'User',
  tags: 'Tag'
};
