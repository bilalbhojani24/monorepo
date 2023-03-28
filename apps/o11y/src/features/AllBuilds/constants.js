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
  'Automation Bug': '#8D51C2', // purple
  'Environment Issue': '#DBBD29', // yellow
  'No Defect': '#E25092', // pink
  'Product Bug': '#5C9EEB', // blue
  'To be Investigated': '#C47631' // brown
};