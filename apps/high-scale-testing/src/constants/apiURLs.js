import { getBaseURL } from '../utils/getBaseURL';

import { INIT_PATH, SSO_PATH } from './apiPaths';

const BASE_URL = getBaseURL();

const INIT_URL = `${BASE_URL}${INIT_PATH}`;
const SSO_URL = `${BASE_URL}${SSO_PATH}`;

export { INIT_URL, SSO_URL };
