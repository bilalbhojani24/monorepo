export const BASE_ROUTE = '';
export const REACT_ROOT_ELEMENT_ID = 'react-root';
export const SENTRY_DSN =
  'https://7e1fb28d5ba94c13aace08eefcf2605c@o70254.ingest.sentry.io/4505328609525760';
export const PROD_API_URL = 'https://www.browserstack.com/accessibility/api';
export const DEFAULT_ERROR_MESSAGE = 'Something went wrong!';
export const CHROME_EXTENSION_URL =
  'https://chrome.google.com/webstore/detail/accessibility-toolkit/fmkhjeeeojocenbconhndpiohohajokn';
export const ROUTES = {
  report: '/reports/report',
  reports: '/reports',
  screenReader: '/screen-reader',
  siteScanner: '/site-scanner',
  scanDetails: '/site-scanner/scan-details/:id',
  scanReports: '/site-scanner/scan-report',
  root: '/',
  welcome: '/welcome'
};

export const TEST_TYPE = {
  ASSITIVE_TEST: 'assistiveTest',
  WORKFLOW_SCAN: 'workflowScan'
};

export const EDSKey = 'accessibility_dashboard_web_events';
export const ENVS = {
  STAGING: 'STAGING',
  PRODUCTION: 'PRODUCTION',
  LOCAL: 'LOCAL'
};

export const NEEDS_REVIEW_BANNER_TEXT = {
  ACCEPTED: "This 'needs review' instance has been confirmed as an issue",
  REJECTED: "This 'needs review' instance has been dismissed as not an issue",
  DEFAULT_TITLE: 'Issue needs review',
  DEFAULT_MESSAGE:
    'This issue requires manual inspection to confirm its validity.'
};

export const FILTER_KEYS = {
  CATEGORY: 'category',
  PAGE: 'page',
  COMPONENT: 'component',
  IMPACT: 'impact'
};

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
  TITLE: 'Screen reader launcher',
  SUB_TITLE: 'Select a browser to launch screen reader on a real device.'
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

export const testTypes = {
  assistiveTest: 'assistiveTest',
  workflowScan: 'workflowScan',
  websiteScan: 'websiteScan'
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
    value: testTypes.workflowScan
  },
  {
    label: 'Assisted test',
    value: testTypes.assistiveTest
  },
  {
    label: 'Website scan',
    value: testTypes.websiteScan
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

export const ANALYTICS_KEYS = {
  amplitudeKey: '',
  amplitudeConfig: {
    key: '',
    userData: {},
    groupData: {}
  },
  analyticsKey: 'UA-x-x',
  EDSDetails: {
    config: {
      server: 'eds.browserstack.com',
      port: '443',
      apiKey: ''
    }
  }
};

export const sentryConfig = {
  dsn: SENTRY_DSN,
  debug: false,
  release: 'v0.1-a11y',
  environment: 'production',
  tracesSampleRate: 1.0,
  denyUrls: [
    // Ignoring errors getting generated from Chrome extensions as these are not to be logged under our sentry env.
    /extensions\//i,
    /^chrome:\/\//i,
    /extension:\//i,
    // Ignoring VWO related errors as there is no specific library upgrade which can resolve the errors.
    // Also the errors we are getting are more or less specfic to some of the users.
    /https:\/\/dev.visualwebsiteoptimizer.com\/.*/gi,
    // Ignore errors getting raised from freshchat widget related code.
    /https:\/\/wchat.freshchat.com\/.*/gi
  ]
};

export const PRODUCT_NAV_IDENTIFIER = 'Accessibility Testing';
