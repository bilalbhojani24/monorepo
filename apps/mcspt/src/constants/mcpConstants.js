import { getCsptApiUrl } from 'api/apiUtils';

export const SSO_AUTH_URL = `${getCsptApiUrl()}/auth/start-sso`;

export const EXISTING_REPORTS_SAMPLE_SWITCH = 3;

export const REPORT_LOADING_STATES = {
  NOT_STARTED: 'not_started',
  CONNECTING: 'connecting',
  LAUNCHING: 'launching',
  RECORDING: 'recording',
  STOPPING: 'stopping',
  COMPLETE: 'complete',
  FAILED: 'failed'
};
