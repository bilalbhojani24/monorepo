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

export const TOOLTIP_STYLES = {
  backgroundColor: '#00335D',
  borderColor: 'transparent',
  style: {
    color: '#fff',
    textTransform: 'capitalize'
  }
};
