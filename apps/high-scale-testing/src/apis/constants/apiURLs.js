import { getBaseURL } from '../utils/getBaseURL';

import { INIT_PATH, ONBOARDING_DATA_PATH, SSO_PATH } from './apiPaths';

const BASE_URL = getBaseURL();

const INIT_URL = `${BASE_URL}${INIT_PATH}`;
const ONBOARDING_DATA = `${BASE_URL}${ONBOARDING_DATA_PATH}`;
const SSO_URL = `${BASE_URL}${SSO_PATH}`;

export { INIT_URL, ONBOARDING_DATA, SSO_URL };
