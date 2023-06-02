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

export const FIRST_SCREEN = 'uploadFile';
export const SECOND_SCREEN = 'mapFields';
export const THIRD_SCREEN = 'previewAndConfirmImport';

export const ONGOING_IMPORT_MODAL_DATA = {
  label: 'Import Progress:',
  text: "Please don't close/refresh this page until the import is complete.",
  firstButtonText: 'Cancel Import',
  secondButtonText: null,
  isButtonLoading: false
};

export const FAILED_IMPORT_MODAL_DATA = {
  label: 'Import was unsuccessful',
  text: 'We were not able to complete the import successfully. Download error report and try again.',
  firstButtonText: 'Download Report',
  secondButtonText: 'Retry Import'
};
