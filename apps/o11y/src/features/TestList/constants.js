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

export const FILTER_TAGNAME_MAPPING = {
  status: 'Status: ',
  duration: 'Sort Duration: ',
  issueType: 'Defect: ',
  issueTypeGroup: 'Defect Group: ',
  history: '',
  error: 'Error: ',
  name: 'Name: ',
  flaky: 'Show Flaky: ',
  browser: 'Browser: ',
  os: 'OS: ',
  device: 'Device: ',
  tags: 'Tag: ',
  host: 'Host: ',
  search: 'Search: ',
  isMuted: 'Show Muted: ',
  hasJira: 'Jira Issue: ',
  hasReRuns: 'Re-runs: ',
  run: 'Run: ',
  folder: 'Folder: '
};

export const singleItemTestDetails = {
  browser: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string
  }),
  device: PropTypes.string,
  filePath: PropTypes.string,
  vcFileUrl: PropTypes.string,
  finishedAt: PropTypes.string,
  middleScopes: PropTypes.arrayOf(PropTypes.string),
  os: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string
  }),
  retries: PropTypes.arrayOf(PropTypes.object)
};

export const statusObjectPropType = {
  passed: PropTypes.number,
  failed: PropTypes.number,
  pending: PropTypes.number,
  skipped: PropTypes.number,
  timeout: PropTypes.number
};

export const singleItemPropType = {
  id: PropTypes.string,
  displayName: PropTypes.string,
  rank: PropTypes.number,
  details: PropTypes.shape(singleItemTestDetails),
  type: PropTypes.string,
  children: PropTypes.array,
  status: PropTypes.shape(statusObjectPropType)
};

export const HIERARCHY_SPACING = 20;
export const HIERARCHY_SPACING_START = 24;

export const LOG_TYPES = {
  STACKTRACE: 'TEST_FAILURE',
  IMAGES: 'TEST_LOG'
};
