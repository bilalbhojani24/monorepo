import AppRoute from 'const/routes';

export const IMPORT_OPTIONS = [
  {
    body: 'Quick Import',
    id: 'quick',
    divider: true,
    route: AppRoute.IMPORT_WITH_PROJECTS
  }
  // { body: 'Import from TestRail (XML)', id: 'TestRail', divider: false },
  // { body: 'Import from Zephyr (XML)', id: 'Zephyr', divider: false },
  // {
  //   body: 'Import from Xray (CSV)',
  //   id: 'Xray',
  //   divider: false
  // }
];
