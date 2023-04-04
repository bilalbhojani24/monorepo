export const MAP_FIELD_COLUMNS = [
  {
    name: 'YOUR CSV DATA',
    key: 'field'
  },
  {
    name: 'WILL BE MAPPED TO',
    key: 'mappedField'
  },
  {
    name: 'VALUES FROM YOUR CSV',
    key: 'mappedValue'
  }
];

export const MAP_MODAL_COLUMNS = [
  {
    name: 'CSV Values',
    key: 'csvValue'
  },
  {
    name: 'System Values',
    key: 'systemValue'
  }
];

export const IGNORE_FIELD_LABEL = 'Ignore this Field';
export const IGNORE_FIELD_VALUE = 'ignore';
export const ADD_FIELD_LABEL = 'Add New Field';
export const ADD_FIELD_VALUE = 'add';

export const IGNORE_VALUE_LABEL = 'Ignore this value';
export const IGNORE_VALUE_VALUE = 'ignore';
export const ADD_VALUE_LABEL = 'Create new value';
export const ADD_VALUE_VALUE = 'add';

export const PREVIEW_AND_CONFIRM_COLUMNS = [
  { name: '#', key: 'id' },
  { name: 'Title', key: 'title' },
  { name: 'Template Type', key: 'templateType' },
  { name: 'Priority', key: 'priority' },
  { name: 'Owner', key: 'owner' },
  { name: 'Type', key: 'type' }
];

export const DEFAULT_TABLE_DROPDOWN_OPTIONS = [
  { label: IGNORE_FIELD_LABEL, value: IGNORE_FIELD_VALUE },
  { label: ADD_FIELD_LABEL, value: ADD_FIELD_VALUE }
];

export const DEFAULT_MODAL_DROPDOWN_OPTIONS = [
  { label: ADD_VALUE_LABEL, value: ADD_VALUE_VALUE },
  { label: IGNORE_VALUE_LABEL, value: IGNORE_VALUE_VALUE }
];

export const VALUE_MAPPING_OPTIONS = {
  PRIORITY: [
    { label: 'Critical', value: 'critical' },
    { label: 'High', value: 'high' },
    { label: 'Medium', value: 'medium' },
    { label: 'Low', value: 'low' },
    ...DEFAULT_MODAL_DROPDOWN_OPTIONS
  ],
  STATE: [
    { label: 'Active', value: 'active' },
    { label: 'Draft', value: 'draft' },
    { label: 'In Review', value: 'in review' },
    { label: 'Rejected', value: 'rejected' },
    { label: 'Outdated', value: 'outdated' },
    ...DEFAULT_MODAL_DROPDOWN_OPTIONS
  ],
  TESTCASETYPE: [
    { label: 'Acceptance', value: 'acceptance' },
    { label: 'Accessibility', value: 'accessibility' },
    { label: 'Automated', value: 'automated' },
    { label: 'Compatibility', value: 'compatibility' },
    { label: 'Destructive', value: 'destructive' },
    { label: 'Functional', value: 'functional' },
    { label: 'Other', value: 'other' },
    { label: 'Performance', value: 'performance' },
    { label: 'Regression', value: 'regression' },
    { label: 'Security', value: 'security' },
    { label: 'Smoke & Sanity', value: 'smoke_sanity' },
    { label: 'Usability', value: 'usability' },
    { label: 'Manual', value: 'manual' },
    ...DEFAULT_MODAL_DROPDOWN_OPTIONS
  ]
};

export const FIRST_SCREEN = 'uploadFile';
export const SECOND_SCREEN = 'mapFields';
export const THIRD_SCREEN = 'previewAndConfirmImport';

export const ONGOING_IMPORT_MODAL_DATA = {
  label: 'Import is in progress',
  text: 'This will take a few minutes. Please don’t close/refresh this page until the import is complete.',
  firstButtonText: 'Cancel Import',
  secondButtonText: null
};

export const FAILED_IMPORT_MODAL_DATA = {
  label: 'Import was unsuccessful',
  text: 'We were not able to complete the import successfully. Download error report and try again.',
  firstButtonText: 'Download Report',
  secondButtonText: 'Retry Import'
};

// export const IMPORT_FROM_TOOL = 'import-from-tool';
// export const UPLOAD_FILE = 'upload-file';
// export const TEST_RAILS = 'testrails';
// export const ZEPHYR = 'zephyr';
