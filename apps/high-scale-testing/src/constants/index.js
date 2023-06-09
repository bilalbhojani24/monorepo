const DEFAULT_GRID_CONCURRENCY = 50;

const CREATE_GRID_TYPES = {
  helmKubeCTL: 'Helm',
  cli: 'CLI'
};

const GRID_MANAGER_NAMES = {
  helm: 'Helm',
  kubectl: 'Kubectl',
  cli: 'CLI'
};

// Note: Below values are in seconds
const MAX_IDLE_TIMEOUT = 3600;
const MAX_QUEUE_TIMEOUT = 3600;
const MAX_TEST_TIMEOUT = 28800;
// -----X-----X-----

const SCRATCH_RADIO_GROUP_OPTIONS = [
  {
    disabled: false,
    id: 'radio-1',
    name: 'Amazon Cloud',
    configName: 'aws'
  },
  {
    disabled: true,
    id: 'radio-2',
    name: 'Google Cloud',
    configName: 'gcp'
  },
  {
    disabled: true,
    id: 'radio-3',
    name: 'Microsoft Azure',
    configName: 'azure'
  }
];

export {
  CREATE_GRID_TYPES,
  DEFAULT_GRID_CONCURRENCY,
  GRID_MANAGER_NAMES,
  MAX_IDLE_TIMEOUT,
  MAX_QUEUE_TIMEOUT,
  MAX_TEST_TIMEOUT,
  SCRATCH_RADIO_GROUP_OPTIONS
};
