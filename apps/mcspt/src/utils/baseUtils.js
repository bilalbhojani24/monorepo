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

export const decideCurrentRoute = () => {
  const locationHashFrags = window.location.href.split('#');

  if (locationHashFrags?.[1] !== undefined && locationHashFrags?.[1] !== '') {
    return locationHashFrags?.[1];
  }

  return '/';
};
