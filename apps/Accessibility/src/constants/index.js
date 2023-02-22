export const BASE_ROUTE = '';
export const REACT_ROOT_ELEMENT_ID = 'react-root';
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';
export const ROUTES = {
  report: 'reports/report',
  reports: 'reports',
  screenReader: 'screen-reader'
};

const Config = {
  generate_url: () => 'hello'
};

export const EDSKey = 'web_events';

export const SCREEN_READER_LIVE_URL = Config.generate_url(
  '/screen-reader/start',
  'accessibility'
);

export const NEEDS_REVIEW_BANNER_TEXT = {
  ACCEPTED: "This 'Needs Review' instance has been confirmed as an issue",
  REJECTED: "This 'Needs Review' instance has been dismissed as not an issue",
  DEFAULT_TITLE: 'Issue Needs Review',
  DEFAULT_MESSAGE:
    'This issue requires manual inspection to confirm its validity.'
};

export const FILTER_KEYS = {
  CATEGORY: 'category',
  PAGE: 'page',
  COMPONENT: 'component',
  IMPACT: 'impact'
};

export const columns = [
  {
    title: 'Report name',
    key: 'report_name',
    width: 320
  },
  {
    title: 'Scan by',
    key: 'scan_by'
  },
  {
    title: 'Date',
    key: 'time'
  },
  {
    title: 'Scan scope',
    key: 'scan_scope'
  },
  {
    title: 'Issue count',
    key: 'issue_count'
  },
  {
    title: 'Page count',
    key: 'page_count'
  },
  {
    title: '',
    key: 'hyperlink'
  }
];

export const versions = [
  {
    label: 'WCAG 2.1',
    value: 'WCAG 2.1'
  },
  {
    label: 'WCAG 2.0',
    value: 'WCAG 2.0'
  }
];

export const ISSUES = 'issues';
export const SUMMARY = 'summary';

export const ISSUE_DETAILS_TAB = 'ISSUE_DETAILS_TAB';
export const HOW_TO_FIX_TAB = 'HOW_TO_FIX_TAB';

export const ISSUE_TYPE = 'issue-type';
export const GUIDELINES = 'guidelines';

export const issueTabs = [
  {
    label: 'Issue type',
    value: ISSUE_TYPE
  },
  {
    label: 'WCAG guidelines',
    value: GUIDELINES
  }
];

export const SCREEN_READER_DEVICE_TYPE = {
  MAC: 'Mac',
  WINDOWS: 'Windows',
  ANDROID: 'Android'
};

export const SCREEN_READER_DEVICE_TITLES = {
  MAC: 'VOICEOVER ON MAC',
  WINDOWS: 'NVDA ON WINDOWS',
  ANDROID: 'TALKBACK ON ANDROID'
};

export const SCREEN_READER_HEADER_TITLES = {
  TITLE: 'Screen reader quick launch',
  SUB_TITLE: 'Select a browser to launch screen reader on a real device '
};

export const events = {
  SELECT_TAB: 'Select tab',
  SELECT_REPORT: 'Select report',
  CANCEL_SELECTION: 'Cancel selection',
  DISPLAY_INDIVIDUAL_REPORT: 'Display individual report',
  DISPLAY_CONSOLIDATED_REPORT: 'Display consolidated report',
  DOWNLOAD_NOW: 'Download now',
  CLOSE_BANNER: 'Close banner',
  DOWNLOAD_EXTENSION: 'Download',
  CLOSE_MODAL: 'Close',
  CROSS_BUTTON: 'Cross button',
  PRESS_BACK_BUTTON: 'Press back button',
  CHOOSE_TAB: 'Choose tab',
  INTERACT_WITH_CHART: 'Interact with chart'
};

export const activeInitFilters = {
  impact: [],
  page: [],
  component: [],
  category: [],
  showNeedsReviewIssues: false
};

export const issueTypes = [
  { modifier: 'error', type: 'critical' },
  { modifier: 'error', type: 'serious' },
  { modifier: 'warn', type: 'moderate' },
  { modifier: 'base', type: 'minor' }
];

export const reportType = [
  {
    label: 'Workflow scan',
    value: 'Workflow scan'
  },
  {
    label: 'Assisted test',
    value: 'Assisted test'
  }
];

export const reportPerPage = 15;

export const severityOptions = [
  {
    label: 'Critical',
    value: 'critical'
  },
  {
    label: 'Serious',
    value: 'serious'
  },
  {
    label: 'Moderate',
    value: 'moderate'
  },
  {
    label: 'Minor',
    value: 'minor'
  }
];

export const getUrlForHeader = (relativeUrl) =>
  `https://www.browserstack.com/${relativeUrl}`;
