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
