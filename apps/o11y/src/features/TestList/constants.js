import PropTypes from 'prop-types';

export const EMPTY_STATIC_FILTERS = {
  issueType: [],
  folder: [],
  os: [],
  flaky: [],
  browser: [],
  history: [],
  tags: [],
  status: []
};

export const EMPTY_SELECTED_FILTERS = {
  ...EMPTY_STATIC_FILTERS,
  isMuted: false
};

export const EMPTY_APPLIED_FILTERS = {
  ...EMPTY_STATIC_FILTERS,
  search: '',
  isMuted: false
};

export const TESTLIST_TYPES = {
  ROOT: 'ROOT',
  TEST: 'TEST',
  DESCRIBE: 'DESCRIBE'
};

export const EMPTY_TESTLIST_DATA_STATE = {
  hierarchy: [],
  pagingParams: {},
  buildId: ''
};

export const singleItemTestDetails = {
  browser: {
    name: PropTypes.string,
    version: PropTypes.string
  },
  device: PropTypes.string,
  filePath: PropTypes.string,
  vcFileUrl: PropTypes.string,
  finishedAt: PropTypes.string,
  middleScopes: PropTypes.arrayOf(PropTypes.string),
  os: {
    name: PropTypes.string,
    version: PropTypes.string
  },
  retries: PropTypes.arrayOf({
    uuid: PropTypes.string,
    status: PropTypes.string,
    duration: PropTypes.number,
    logs: {
      TEST_FAILURE: PropTypes.arrayOf(PropTypes.string)
    }
  })
};

export const singleItemPropType = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  rank: PropTypes.number,
  details: PropTypes.shape(singleItemTestDetails),
  type: PropTypes.string,
  children: PropTypes.array,
  status: {
    passed: PropTypes.number,
    failed: PropTypes.number,
    pending: PropTypes.number,
    skipped: PropTypes.number,
    timeout: PropTypes.number
  }
};

export const HIERARCHY_SPACING = 12;
export const HIERARCHY_SPACING_START = 24;

export const LOG_TYPES = {
  STACKTRACE: 'TEST_FAILURE',
  IMAGES: 'TEST_LOG'
};
