export const IMPORT_STEPS = [
  {
    id: 1,
    name: 'CONFIGURE TOOL',
    description: 'Pick which tool you want to import from',
    status: 'current'
  },
  {
    id: 2,
    name: 'CONFIGURE DATA',
    description: 'Configure projects data for import',
    status: 'upcoming'
  },
  {
    id: 3,
    name: 'CONFIRM IMPORT',
    description: 'Once confirmed, importing will begin',
    status: 'upcoming'
  }
];

export const IMPORT_FROM_TOOL = 'import-from-tool';
export const UPLOAD_FILE = 'upload-file';
export const TEST_RAILS = 'testrails';
export const ZEPHYR = 'zephyr';
export const CURRENT_STEP = 'current';
export const UPCOMING_STEP = 'upcoming';
export const COMPLETE_STEP = 'complete';
export const CURRENT_COMPLETED_STEP = 'current_completed';
