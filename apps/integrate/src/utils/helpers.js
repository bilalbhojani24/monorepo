import { getUnixTime } from 'date-fns';
import { isEmpty, pickBy } from 'lodash';

export const getCleanedConfigurationIds = (configurations) =>
  configurations.map((configuration) => configuration.value).join();

export const cleanFilterForPayload = (filter) => {
  if (!filter) return null;
  if (Array.isArray(filter) && filter.length) {
    const res = [];
    filter.forEach((item) => res.push(item.value));
    return res.join();
  }
  return filter;
};

export const getFiltersPayload = (filters) => {
  const pickFiltersBy = (filter) => {
    if (typeof filter === 'string') return Boolean(filter);
    return !isEmpty(filter);
  };
  const pickedFilters = pickBy(filters, pickFiltersBy);
  return Object.entries(pickedFilters).reduce((accumulator, currentFilter) => {
    let accumulatorCopy = accumulator;
    const [filterKey, filterValue] = currentFilter;
    const cleanedFilter = cleanFilterForPayload(filterValue);
    if (typeof cleanedFilter === 'object') {
      accumulatorCopy = { ...accumulatorCopy, ...cleanedFilter };
    } else {
      accumulatorCopy[filterKey] = cleanedFilter;
    }
    return accumulatorCopy;
  }, {});
};
export const getUnixDate = (date) => {
  if (date && !isEmpty(date)) {
    return { to: getUnixTime(date.to), from: getUnixTime(date.from) };
  }
  return date;
};
