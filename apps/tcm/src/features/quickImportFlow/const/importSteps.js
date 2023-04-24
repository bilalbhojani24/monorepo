export const CONFIGURE_TOOL = 'SELECT TOOL';
export const CONFIGURE_DATA = 'REVIEW DATA';
export const CONFIRM_IMPORT = 'BEGIN IMPORT';

export const SCREEN_1 = 'selectTool';
export const SCREEN_2 = 'reviewData';
export const SCREEN_3 = 'beginImport';

export const IMPORT_STEPS = [
  {
    id: 1,
    name: CONFIGURE_TOOL,
    description: 'Pick tool you want to import from',
    status: 'current'
  },
  {
    id: 2,
    name: CONFIGURE_DATA,
    description: 'Review projects that will be imported',
    status: 'upcoming'
  },
  {
    id: 3,
    name: CONFIRM_IMPORT,
    description: 'Once confirmed, importing will begin instantly',
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
