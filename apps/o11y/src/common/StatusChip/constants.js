import { TEST_STATUS } from 'constants/common';

export const STATUS_MODIFIERS = {
  [TEST_STATUS.PASS]: 'success',
  [TEST_STATUS.FAIL]: 'error',
  [TEST_STATUS.PENDING]: 'primary',
  [TEST_STATUS.SKIPPED]: 'base',
  [TEST_STATUS.TIMEOUT]: 'warn',
  [TEST_STATUS.FINISHED]: 'base',
  [TEST_STATUS.STARTED]: 'base',
  [TEST_STATUS.UNKNOWN]: 'base'
};
