import { getBaseURL } from '../utils/getBaseURL';

import {
  INIT_PATH,
  ONBOARDING_DATA_PATH,
  ONBOARDING_EVENT_LOGS_DATA_PATH,
  ONBOARDING_REGION_PATH,
  ONBOARDING_STATUS_PATH,
  SSO_PATH
} from './apiPaths';

const BASE_URL = getBaseURL();

const INIT_URL = `${BASE_URL}${INIT_PATH}`;
const ONBOARDING_DATA_URL = `${BASE_URL}${ONBOARDING_DATA_PATH}`;
const ONBOARDING_EVENT_LOGS_DATA_URL = `${BASE_URL}${ONBOARDING_EVENT_LOGS_DATA_PATH}`;
const ONBOARDING_REGION_CHANGE_URL = `${BASE_URL}${ONBOARDING_REGION_PATH}`;
const ONBOARDING_STATUS_URL = `${BASE_URL}${ONBOARDING_STATUS_PATH}`;
const SSO_URL = `${BASE_URL}${SSO_PATH}`;

export {
  INIT_URL,
  ONBOARDING_DATA_URL,
  ONBOARDING_EVENT_LOGS_DATA_URL,
  ONBOARDING_REGION_CHANGE_URL,
  ONBOARDING_STATUS_URL,
  SSO_URL
};