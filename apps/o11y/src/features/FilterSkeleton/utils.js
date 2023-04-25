import isEmpty from 'lodash/isEmpty';

import { ADV_FILTER_TYPES, ADV_FILTERS_PREFIX } from './constants';

export const getAppliedFilterObj = ({ id, text, type }) => ({
  id,
  text,
  type,
  appliedText: `${ADV_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true
});

export const getFilterQueryParams = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
  Object.values(ADV_FILTER_TYPES).forEach((type) => {
    const filters = appliedFilters
      .filter((item) => item.type === type)
      .map((i) => i?.id);
    if (!isEmpty(filters)) {
      searchParams.set(type, filters);
    }
  });
  return searchParams;
};
