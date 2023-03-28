import { ALERT_CONDITION_KEYS } from './constants';

export const getWarningInputError = ({
  warningValue,
  criticalValue,
  condition
}) => {
  if (
    condition === ALERT_CONDITION_KEYS.GREATER_THAN_EQUAL &&
    criticalValue <= warningValue
  ) {
    return 'Warning value should be smaller than critical value';
  }
  if (
    condition === ALERT_CONDITION_KEYS.LESS_THAN_EQUAL &&
    criticalValue >= warningValue
  ) {
    return 'Warning value should be greater than critical value';
  }
  return '';
};
