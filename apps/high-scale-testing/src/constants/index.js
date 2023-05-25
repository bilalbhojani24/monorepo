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

export { GRID_MANAGER_NAMES, SCRATCH_RADIO_GROUP_OPTIONS };
