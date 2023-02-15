export const CURRENT_STEP = 'current';
export const UPCOMING_STEP = 'upcoming';
export const COMPLETE_STEP = 'complete';

export const IMPORT_CSV_STEPS = [
  {
    id: 1,
    name: 'UPLOAD FILE',
    description: 'Pick which tool you want to import from',
    status: CURRENT_STEP
  },
  {
    id: 2,
    name: 'MAP FIELDS',
    description: 'Configure projects data for import',
    status: UPCOMING_STEP
  },
  {
    id: 3,
    name: 'PREVIEW & CONFIRM IMPORT',
    description: 'Once confirmed, importing will begin',
    status: UPCOMING_STEP
  }
];

export const CSV_SEPARATOR = [
  { label: 'Comma (,)', value: ',' },
  { label: 'Semicolon (;)', value: ';' },
  { label: 'Colon (:)', value: ':' },
  { label: 'Pipe (|)', value: '|' },
  { label: 'Tab (/t)', value: '/t' }
];

export const ENCODING = [
  { label: 'UTF-8', value: 'UTF-8' },
  { label: 'ISO-8859-1', value: 'ISO-8859-1' },
  { label: 'ISO-8859-15', value: 'ISO-8859-15' },
  { label: 'Windows-1252', value: 'Windows-1252' }
];

export const MAP_FIELD_COLUMNS = [
  {
    name: 'CSV Column Header',
    key: 'field'
  },
  {
    name: 'Test Management Fields',
    key: 'mappedField'
  },
  {
    name: 'Value Mapping',
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

export const VALUE_MAPPING_OPTIONS = {
  PRIORITY: [
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
    { label: 'Low', value: 'Low' },
    { label: 'Ignore', value: 'Ignore' },
    { label: 'Create new one', value: 'Create new one' }
  ]
};

export const UPLOAD_FILE = 'uploadFile';
export const MAP_FIELDS = 'mapFields';
export const PREVIEW_AND_CONFIRM_IMPORT = 'previewAndConfirmImport';

// export const IMPORT_FROM_TOOL = 'import-from-tool';
// export const UPLOAD_FILE = 'upload-file';
// export const TEST_RAILS = 'testrails';
// export const ZEPHYR = 'zephyr';
