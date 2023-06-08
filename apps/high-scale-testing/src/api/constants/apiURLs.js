import { getBaseURL } from '../utils/getBaseURL';

import {
  CREATE_GRID_EVENT_LOGS_DATA_PATH,
  FETCH_CLUSTER_PATH,
  FETCH_CLUSTERS_PATH,
  FETCH_GRID_PROFILES_DATA_PATH,
  FETCH_GRIDS_PATH,
  GRID,
  INIT_PATH,
  ONBOARDING_DATA_PATH,
  ONBOARDING_EVENT_LOGS_DATA_PATH,
  ONBOARDING_REGION_PATH,
  ONBOARDING_STATUS_PATH,
  SSO_PATH
} from './apiPaths';

const BASE_URL = getBaseURL();

const CREATE_GRID = `${BASE_URL}${GRID}`;
const CREATE_GRID_EVENT_LOGS_DATA_URL = `${BASE_URL}${CREATE_GRID_EVENT_LOGS_DATA_PATH}`;
const INIT_URL = `${BASE_URL}${INIT_PATH}`;
const FETCH_GRID_PROFILES_DATA_URL = `${BASE_URL}${FETCH_GRID_PROFILES_DATA_PATH}`;
const FETCH_GRIDS_URL = `${BASE_URL}${FETCH_GRIDS_PATH}`;

const FETCH_CLUSTER_URL = `${BASE_URL}${FETCH_CLUSTER_PATH}`;
const FETCH_GRID_URL = `${BASE_URL}${GRID}`;
const FETCH_CLUSTERS_URL = `${BASE_URL}${FETCH_CLUSTERS_PATH}`;
const ONBOARDING_DATA_URL = `${BASE_URL}${ONBOARDING_DATA_PATH}`;
const ONBOARDING_EVENT_LOGS_DATA_URL = `${BASE_URL}${ONBOARDING_EVENT_LOGS_DATA_PATH}`;
const ONBOARDING_REGION_CHANGE_URL = `${BASE_URL}${ONBOARDING_REGION_PATH}`;
const ONBOARDING_STATUS_URL = `${BASE_URL}${ONBOARDING_STATUS_PATH}`;
const SSO_URL = `${BASE_URL}${SSO_PATH}`;
const UPDATE_GRID_SETTINGS_URL = `${BASE_URL}${GRID}`;

export {
  CREATE_GRID,
  CREATE_GRID_EVENT_LOGS_DATA_URL,
  FETCH_CLUSTER_URL,
  FETCH_CLUSTERS_URL,
  FETCH_GRID_PROFILES_DATA_URL,
  FETCH_GRID_URL,
  FETCH_GRIDS_URL,
  INIT_URL,
  ONBOARDING_DATA_URL,
  ONBOARDING_EVENT_LOGS_DATA_URL,
  ONBOARDING_REGION_CHANGE_URL,
  ONBOARDING_STATUS_URL,
  SSO_URL,
  UPDATE_GRID_SETTINGS_URL
};
