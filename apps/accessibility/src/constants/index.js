import AccessibilityPlaceholderImage from 'assets/accessibility_modal.svg';
import Announcement from 'assets/announcement.svg';
import ScreenReaderPlaceholderImage from 'assets/screen_reader_modal.svg';
import Star from 'assets/star.svg';

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

const BUY_PLAN = 'Buy a plan';

export const TRIAL_NOT_STARTED = 'not_started';
export const TRIAL_STARTED = 'enabled';
export const TRIAL_IN_PROGRESS = 'processing';
export const TRIAL_EXPIRED = 'expired';
export const TRIAL_FAILED = 'failed';

export const SCREEN_READER = 'Screen reader';

export const PAID_PLAN = 'paid';

export const getBannerDetails = (days) => ({
  not_started: {
    icon: Star,
    description: 'Try Team plan for free: ',
    subDescription:
      'Unlock premium features like Advanced Assisted Tests, Screen Readers and more',
    buttonText: 'Get 14-day free trial',
    color: 'brand'
  },
  enabled: {
    icon: '',
    description:
      'Your free 14-day trial for the Accessibility Team plan has started.',
    subDescription: '',
    color: 'success'
  },
  last_five_days: {
    icon: Announcement,
    description: `Your Team free trial is ending in ${days} days. Purchase the Team plan to continue using premium features.`,
    subDescription: '',
    buttonText: BUY_PLAN,
    color: 'attention'
  },
  expired: {
    icon: Announcement,
    description:
      'Free trial for Team plan has expired. Purchase the Team plan to continue using premium features.',
    subDescription: '',
    buttonText: BUY_PLAN,
    color: 'danger'
  }
});

const modalSubheading =
  'Try the Team plan for free and unlock premium features';

const accessibilityModalContent = [
  {
    key: 'Assisted Tests:',
    value: 'Find advanced issues for interactive elements'
  },
  {
    key: 'Screen Readers:',
    value: 'Desktop & mobile screen readers on real devices'
  },
  {
    key: 'Website Scanner:',
    value: 'Upto 200 pages/scan & unlimited monitoring'
  },
  {
    key: 'Data Retention:',
    value: 'Access reports for up to 180 days'
  }
];

const screenReaderModalContent = [
  {
    key: 'Screen Readers:',
    value: 'Desktop & mobile screen readers on real devices'
  },
  {
    key: 'Assisted Tests:',
    value: 'Find advanced issues for interactive elements'
  },
  {
    key: 'Website Scanner:',
    value: 'Upto 200 pages/scan & unlimited monitoring'
  },
  {
    key: 'Data Retention:',
    value: 'Access reports for up to 180 days'
  }
];

export const getModalDetails = {
  accessibility: {
    heading: 'Let’s supercharge your accessibility testing!',
    subHeading: modalSubheading,
    placeholderImage: AccessibilityPlaceholderImage,
    content: accessibilityModalContent,
    buttonText: 'Activate 14-day free trial'
  },
  screenReader: {
    heading: 'Get the Team plan to access Screen readers',
    subHeading: modalSubheading,
    placeholderImage: ScreenReaderPlaceholderImage,
    content: screenReaderModalContent,
    buttonText: 'Activate 14-day free trial'
  },
  buyPlan: {
    heading: 'Get the Team plan to access Screen readers',
    subHeading: 'Buy the Team plan and unlock premium features',
    placeholderImage: ScreenReaderPlaceholderImage,
    content: screenReaderModalContent,
    buttonText: 'Buy a plan'
  }
};

export const getAlertDetails = {
  getTrial: {
    title: 'Screen readers are available with the Team plan',
    detailsNode: 'Get 14-day free trial'
  },
  trialInProcess: {
    title: 'Your free trial is being processed...',
    detailsNode: ''
  },
  buyPlan: {
    title: 'Screen readers are available with the Team plan',
    detailsNode: BUY_PLAN
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
