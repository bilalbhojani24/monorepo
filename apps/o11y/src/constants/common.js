export const DOC_KEY_MAPPING = {
  introduction: 'overview/what-is-test-observability',
  wdio: 'quick-start/webdriverio',
  testng: 'quick-start/testng',
  mocha: 'quick-start/mocha',
  uploading_logs: 'integrations/application-logs',
  auto_analyser: 'features/auto-failure-analysis',
  re_run: 'features/re-run',
  mute: 'features/mute-tests',
  source_code: 'integrations/source-code',
  automation_build: 'how-to-guides/organize-test-runs'
};
export const versionedBaseRoute = (version = 'v1') => `/api/${version}`;
export const PROJECT_NORMALISED_NAME_IDENTIFIER =
  'to_activeProjectNormalizedName';

export const API_STATUSES = {
  IDLE: 'idle',
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  FAILED: 'failed'
};

export const TEST_STATUS = {
  PASS: 'passed',
  FAIL: 'failed',
  PENDING: 'pending',
  SKIPPED: 'skipped',
  TIMEOUT: 'timeout',
  FINISHED: 'finished',
  STARTED: 'started',
  UNKNOWN: 'unknown'
};

export const URL_REGEX =
  /* eslint-disable-next-line */
  /^(https:\/\/www\.|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,15}(:[0-9]{1,20})?(\/.*)?$/;

export const WRAPPER_GAP_CLASS = 'h-[calc(100vh-4rem)]';
export const SNP_PARAMS_MAPPING = {
  snpTestDetails: 'snp_test_details',
  snpOsName: 'snp_os_name',
  snpOsVersion: 'snp_os_version',
  snpBrowserName: 'snp_browser_name',
  snpBrowserVersion: 'snp_browser_version',
  snpOsKey: 'snp_os_key',
  snpBrowserKey: 'snp_browser_key',
  snpDeviceKey: 'snp_device_key',
  snpTab: 'snp_tab',
  snpDateRange: 'snp_date_range',
  snpActiveBuild: 'snp_active_build',
  snpErrorId: 'snp_error_id',
  snpErrorTestId: 'snp_etid',
  snpIsFlaky: 'snp_flaky',
  snpIsMuted: 'snp_muted'
};

export const SNP_DATE_RANGE = {
  days7: {
    key: 'days7',
    label: 'Last 7 Days'
  },
  days15: {
    key: 'days15',
    label: 'Last 15 Days'
  },
  days30: {
    key: 'days30',
    label: 'Last 30 Days'
  }
};

export const TOOLTIP_STYLES = {
  backgroundColor: '#00335D',
  borderColor: 'transparent',
  style: {
    color: '#fff',
    textTransform: 'capitalize'
  }
};

export const PUSHER_EVENTS = {
  BUILD_STARTED: 'BUILD_STARTED',
  BUILD_FINISHED: 'BUILD_FINISHED',
  NEW_TESTS: 'NEW_TESTS',
  INSIGHTS_UPDATED: 'INSIGHTS_UPDATED',
  RERUN_STARTED: 'RERUN_STARTED',
  RERUN_FINISHED: 'RERUN_FINISHED',
  ANALYZER_STARTED: 'ANALYZER_STARTED',
  ANALYZER_COMPLETED: 'ANALYZER_COMPLETED',
  UE_ANALYZER_STARTED: 'UE_ANALYZER_STARTED',
  UE_ANALYZER_COMPLETED: 'UE_ANALYZER_COMPLETED',
  NEW_PROJECT: 'NEW_PROJECT'
};

export const UNSUPPORTED_HTML_TAGS = [
  'anonymous',
  'html',
  'head',
  'body',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'p',
  'br',
  'div',
  'section',
  'main',
  'article',
  'header',
  'footer',
  'table',
  'thead',
  'th',
  'tr',
  'td'
];

export const PUSHER_EVENTS = {
  BUILD_STARTED: 'BUILD_STARTED',
  BUILD_FINISHED: 'BUILD_FINISHED',
  NEW_TESTS: 'NEW_TESTS',
  INSIGHTS_UPDATED: 'INSIGHTS_UPDATED',
  RERUN_STARTED: 'RERUN_STARTED',
  RERUN_FINISHED: 'RERUN_FINISHED',
  ANALYZER_STARTED: 'ANALYZER_STARTED',
  ANALYZER_COMPLETED: 'ANALYZER_COMPLETED',
  UE_ANALYZER_STARTED: 'UE_ANALYZER_STARTED',
  UE_ANALYZER_COMPLETED: 'UE_ANALYZER_COMPLETED',
  NEW_PROJECT: 'NEW_PROJECT'
};
