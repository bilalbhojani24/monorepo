import { getBaseUrlForWeb, getCsptApiUrl } from '../utils/apiUtils';

export const SSO_AUTH_URL = `${getCsptApiUrl()}/auth/start-sso`;

export const WEB_SSO_AUTH_URL = `${getBaseUrlForWeb}/auth/start-sso-web`;

export const EXISTING_REPORTS_SAMPLE_SWITCH = 3;
