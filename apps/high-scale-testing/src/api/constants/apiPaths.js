const FETCH_CLUSTER_PATH = '/cluster';

const EVENT_LOGS = '/event-logs';
const GRID = '/grid';
const SETUP_PATH = '/setup';

const CREATE_GRID_EVENT_LOGS_DATA_PATH = `${GRID}${EVENT_LOGS}`;
const CREATE_TRIAL_GRID_PATH = `${SETUP_PATH}/configure-trial-grid`;
const FETCH_GRID_PROFILES_DATA_PATH = '/grid/profiles';
const FETCH_GRIDS_PATH = '/grids';
const INIT_PATH = '/init';
const FETCH_CLUSTERS_PATH = '/clusters';
const SETUP_EVENT_LOGS_DATA_PATH = `${SETUP_PATH}${EVENT_LOGS}`;
const SETUP_REGION_PATH = `${SETUP_PATH}/region-update`;
const SETUP_STATUS_PATH = `${SETUP_PATH}/status-update`;
const SSO_PATH = '/auth/start-sso';
const UPDATE_METADATA_PATH = '/update-metadata';

export {
  CREATE_GRID_EVENT_LOGS_DATA_PATH,
  CREATE_TRIAL_GRID_PATH,
  FETCH_CLUSTER_PATH,
  FETCH_CLUSTERS_PATH,
  FETCH_GRID_PROFILES_DATA_PATH,
  FETCH_GRIDS_PATH,
  GRID,
  INIT_PATH,
  SETUP_EVENT_LOGS_DATA_PATH,
  SETUP_PATH,
  SETUP_REGION_PATH,
  SETUP_STATUS_PATH,
  SSO_PATH,
  UPDATE_METADATA_PATH
};
