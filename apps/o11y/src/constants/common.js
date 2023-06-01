export const PORTAL_ID = 'root-portal';
export const DOC_KEY_MAPPING = {
  application_logs: 'integrations/application-logs',
  auto_analyser: 'features/auto-failure-analysis',
  automation_build: 'how-to-guides/organize-test-runs',
  introduction: 'overview/what-is-test-observability',
  mocha: 'quick-start/mocha',
  mute: 'features/mute-tests',
  re_run: 'features/re-run',
  smart_tags: 'features/smartTags',
  source_code: 'integrations/source-code',
  testng: 'quick-start/testng',
  tnc: `references/terms-and-conditions`,
  uploading_logs: 'integrations/application-logs',
  wdio: 'quick-start/webdriverio'
};
export const EXTERNAL_LINKS = {
  getADemo: 'contact?&ref=observability-dashboard-demo-lead',
  planAndPricing: 'pricing?product=test-observability',
  buyAPlan: 'contact?&ref=observability-dashboard-top-header-csf-lead',
  manageUsers: 'accounts/manage-users'
};
export const versionedBaseRoute = (version = 'v1') => `/api/${version}`;
export const PROJECT_NORMALISED_NAME_IDENTIFIER =
  'to_activeProjectNormalizedName';

export const API_STATUSES = {
  EMPTY: 'empty',
  ERROR: 'error',
  FAILED: 'failed',
  FULFILLED: 'fulfilled',
  IDLE: 'idle',
  LOADING: 'loading',
  PENDING: 'pending'
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
    label: '7D'
  },
  days15: {
    key: 'days15',
    label: '15D'
  },
  days30: {
    key: 'days30',
    label: '30D'
  }
};

export const TOOLTIP_STYLES = {
  backgroundColor: 'var(--colors-base-800)',
  borderColor: 'transparent',
  style: {
    color: '#fff',
    textTransform: 'capitalize'
  }
};

export const COMMON_CHART_CONFIGS = {
  title: {
    text: null
  },
  exporting: {
    enabled: false
  },
  credits: {
    enabled: false
  },
  time: {
    timezoneOffset: new Date().getTimezoneOffset()
  },
  legend: {
    symbolHeight: 8,
    symbolWidth: 8,
    symbolRadius: 8,
    align: 'left',
    verticalAlign: 'top',
    x: -10,
    itemMarginBottom: 20,
    itemStyle: {
      color: '#333',
      fontWeight: 'normal',
      textTransform: 'capitalize'
    }
  }
};

export const COMMON_CHART_STYLES = {
  panning: true,
  panKey: 'shift',
  resetZoomButton: {
    position: {
      x: 0,
      y: -10
    },
    theme: {
      fill: 'white',
      stroke: 'silver',
      r: 3,
      states: {
        hover: {
          fill: '#0067dd',
          style: {
            color: 'white'
          }
        }
      }
    }
  },
  style: {
    fontFamily: '"Inter", sans-serif'
  }
};

export const SUPPORTED_HTML_TAGS = ['mark'];

export const EMAIL_VERIFICATION_REGEX =
  /^[a-zA-Z0-9+_|-](?:[.]?[a-zA-Z0-9'+_|~-])*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
export const TEST_DETAILS_SOURCE = {
  TESTS_LISTING: 'test_listing',
  BUILD_INSIGHTS_UNIQUE_ERRORS: 'build_insights_unique_errors',
  SUITE_HEALTH_TESTS: 'suite_health_tests',
  SUITE_HEALTH_ERRORS: 'suite_health_errors'
};

export const BSTACK_TOPNAV_ELEMENT_ID = 'o11y-header';
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

export const NOTIFICATION_TYPES = {
  dailySummary: 'DAILY_SUMMARY_EMAIL',
  buildInsights: 'BUILD_FINISH_EMAIL'
};

export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

export const TEST_LIST_FILTERS_TAGS = {
  isAlwaysFailing: 'isAlwaysFailing',
  isPerformanceAnomaly: 'isPerformanceAnomaly',
  flaky: 'flaky',
  isNewFailure: 'isNewFailure'
};

// custom history object to allow navigation outside react components
export const o11yHistory = {
  navigate: null,
  location: null
};

export const roundedTableHeaderHack = {
  left: 'rounded-tl-lg before:left-[-1px]',
  right: 'rounded-tr-lg before:right-[-1px]',
  common:
    'before:absolute before:block before:w-[1px] before:h-[6px] before:bg-base-50 before:top-[-1px] before:rounded'
};

export const O11Y_DATE_RANGE = {
  days7: {
    key: 'days7',
    label: '7D'
  },
  days15: {
    key: 'days15',
    label: '15D'
  },
  days30: {
    key: 'days30',
    label: '30D'
  },
  months6: {
    key: 'months6',
    label: '6M'
  },
  year1: {
    key: 'year1',
    label: '1Y'
  },
  year2: {
    key: 'year2',
    label: '2Y'
  },
  custom: {
    key: 'custom',
    label: 'Custom'
  }
};
