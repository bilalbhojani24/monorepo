export const IMPORT_CSV_STEPS = [
  {
    id: 1,
    name: 'UPLOAD FILE',
    description: 'Pick which tool you want to import from',
    status: 'current'
  },
  {
    id: 2,
    name: 'MAP FIELDS',
    description: 'Configure projects data for import',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'PREVIEW & CONFIRM IMPORT',
    description: 'Once confirmed, importing will begin',
    status: 'upcoming'
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

// export const IMPORT_FROM_TOOL = 'import-from-tool';
// export const UPLOAD_FILE = 'upload-file';
// export const TEST_RAILS = 'testrails';
// export const ZEPHYR = 'zephyr';
