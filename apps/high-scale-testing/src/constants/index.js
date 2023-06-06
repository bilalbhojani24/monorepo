const DEFAULT_GRID_CONCURRENCY = 50;

const CREATE_GRID_TYPES = {
  helmKubeCTL: 'Helm/KubeCTL',
  cli: 'CLI'
};

const GRID_MANAGER_NAMES = {
  helm: 'Helm',
  kubectl: 'Kubectl',
  cli: 'CLI'
};

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
  SCRATCH_RADIO_GROUP_OPTIONS
};
