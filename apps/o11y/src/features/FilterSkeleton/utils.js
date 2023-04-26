import isEmpty from 'lodash/isEmpty';

import { ADV_FILTER_TYPES, ADV_FILTERS_PREFIX } from './constants';

export const getAppliedFilterObj = ({ id, text, type, value }) => ({
  id,
  text,
  type,
  appliedText: `${ADV_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true,
  value
});

export const getFilterQueryParams = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
  Object.values(ADV_FILTER_TYPES).forEach((filterTypeObj) => {
    const { key } = filterTypeObj;
    const filters = appliedFilters
      .filter((item) => item.type === key)
      .map((i) => i?.value);
    if (!isEmpty(filters)) {
      searchParams.set(key, filters);
    }
  });
  return searchParams;
};
