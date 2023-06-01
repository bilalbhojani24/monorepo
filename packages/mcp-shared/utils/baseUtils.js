export const sanitizeValue = (value) => {
  if ((value !== 0 && !!value) || value === 0) {
    return Math.round(value);
  }

  return '';
};

export const decideIfCriteriaBreached = (actualValue, criteria) => {
  if (criteria?.operator === 'greaterThan') {
    return actualValue > criteria.value;
  }

  if (criteria?.operator === 'lessThan') {
    return actualValue < criteria.value;
  }

  return false;
};
