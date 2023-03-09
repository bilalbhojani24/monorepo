import { getSubtractedUnixTime } from 'utils/dateTime';

export const DOC_KEY_MAPPING = {
  introduction: 'overview/what-is-test-observability',
  wdio: 'quick-start/webdriverio',
  testng: 'quick-start/testng',
  mocha: 'quick-start/mocha',
  uploading_logs: 'integrations/application-logs',
  auto_analyser: 'features/auto-failure-analysis',
  re_run: 'features/re-run',
  mute: 'features/mute-tests',
  source_code: 'integrations/source-code'
};
export const versionedBaseRoute = (version = 'v1') => `/api/${version}`;
export const PROJECT_NORMALISED_NAME_IDENTIFIER =
  'to_activeProjectNormalizedName';

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
    label: 'Last 7 Days',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(7) * 1000
    }
  },
  days15: {
    label: 'Last 15 Days',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(15) * 1000
    }
  },
  days30: {
    label: 'Last 30 Days',
    getDuration: {
      upperBound: Date.now(),
      lowerBound: getSubtractedUnixTime(30) * 1000
    }
  }
};
