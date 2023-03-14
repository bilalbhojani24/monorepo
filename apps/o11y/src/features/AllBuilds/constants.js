export const EMPTY_SELECTED_FILTERS = {
  status: [],
  users: [],
  tags: [],
  dateRange: {
    lowerBound: '',
    upperBound: ''
  }
};

export const EMPTY_APPLIED_FILTERS = {
  ...EMPTY_SELECTED_FILTERS,
  searchText: ''
};

// "users:13,15"
// "dateRange:1678645800000,1679077799000"
// "tags:regression,daily"
// "statuses:passed,failed"
