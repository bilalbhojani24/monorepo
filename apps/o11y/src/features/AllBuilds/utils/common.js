import isEmpty from 'lodash/isEmpty';
import xor from 'lodash/xor';

import { BUILD_FILTER_TYPES, BUILD_FILTERS_PREFIX } from '../constants';

export const getFilterQueryParams = (appliedFilters = []) => {
  const searchParams = new URLSearchParams();
  Object.values(BUILD_FILTER_TYPES).forEach((type) => {
    const filters = appliedFilters
      .filter((item) => item.type === type)
      .map((i) => i?.id);
    if (!isEmpty(filters)) {
      searchParams.set(type, filters);
    }
  });
  return searchParams;
};

export const getAppliedFilterObj = ({ id, text, type }) => ({
  id,
  text,
  type,
  appliedText: `${BUILD_FILTERS_PREFIX[type]}: ${text}`,
  isApplied: true
});

export const getComboBoxDiffStatus = (prevState, newState) => {
  const diff = xor(prevState, newState);
  const item = diff[0];
  const isChecked = newState.find((newItem) => newItem.value === item.value);
  return {
    checked: !!isChecked,
    item
  };
};
