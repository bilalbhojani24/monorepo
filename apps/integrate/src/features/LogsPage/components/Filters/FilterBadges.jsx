import React, { useMemo } from 'react';
import { INTGBadge, INTGButton } from 'common/bifrostProxy';
import { format, parseISO } from 'date-fns';
import { FILTER_KEY } from 'globalSlice/index';
import PropTypes from 'prop-types';

import { FiltersType } from './types';

const FilterBadge = ({ text, filterKey, value, removeFilter }) => (
  <INTGBadge
    wrapperClassName="py-1 px-2 hover:bg-inherit cursor-default"
    hasRemoveButton
    hasDot={false}
    text={text}
    modifier="primary"
    onClose={() => removeFilter({ filterKey, value })}
  />
);

FilterBadge.propTypes = {
  text: PropTypes.string.isRequired,
  filterKey: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  removeFilter: PropTypes.func.isRequired
};

const getLabelArrayFromSelectOptions = ({
  options,
  itemKey,
  prefix,
  filterKey
}) =>
  options?.reduce((accumulator, option) => {
    const badgeItem = {
      text: `${prefix}: ${option[itemKey]}`,
      filterKey,
      value: option.value
    };
    accumulator.push(badgeItem);
    return accumulator;
  }, []);

const getDateBadge = (filters, filterKey) => {
  const result = [];
  if (filters?.date?.from && filters?.date?.to) {
    const from = format(parseISO(filters.date.from), 'dd/MM/yyyy');
    const to = format(parseISO(filters.date.to), 'dd/MM/yyyy');
    const badgeItem = {
      text: `Date: ${from} to ${to}`,
      filterKey
    };
    result.push(badgeItem);
  }
  return result;
};

const getBagesFromFilters = (filters) => [
  ...getLabelArrayFromSelectOptions({
    options: filters[FILTER_KEY.CONFIGURATIONS],
    itemKey: 'label',
    prefix: 'Configuration',
    filterKey: FILTER_KEY.CONFIGURATIONS
  }),
  ...getLabelArrayFromSelectOptions({
    options: filters[FILTER_KEY.METHOD],
    itemKey: 'label',
    prefix: 'Method',
    filterKey: FILTER_KEY.METHOD
  }),
  ...getLabelArrayFromSelectOptions({
    options: filters[FILTER_KEY.STATUS],
    itemKey: 'value',
    prefix: 'Status',
    filterKey: FILTER_KEY.STATUS
  }),
  ...getLabelArrayFromSelectOptions({
    options: filters[FILTER_KEY.INTEGRATIONS],
    itemKey: 'label',
    prefix: 'Integration',
    filterKey: FILTER_KEY.INTEGRATIONS
  }),
  ...getDateBadge(filters, FILTER_KEY.DATE)
];
const FilterBadges = ({ filters, setFilters, clearFilters }) => {
  const badges = useMemo(() => getBagesFromFilters(filters) ?? [], [filters]);
  const removeFilter = ({ filterKey, value }) => {
    const temp = filters[filterKey];
    let cleanedEntry = null;
    if (Array.isArray(temp))
      cleanedEntry = temp.filter((item) => item.value !== value);
    else cleanedEntry = {};

    setFilters({ ...filters, [filterKey]: cleanedEntry });
  };

  return badges.length ? (
    <div className="flex justify-between">
      <div className="mt-3 flex flex-wrap gap-2">
        <p className="text-base-500 text-sm">Filters | </p>
        {badges.map(({ text, filterKey, value }) => (
          <FilterBadge
            text={text}
            filterKey={filterKey}
            value={value}
            removeFilter={removeFilter}
          />
        ))}
        <INTGButton
          onClick={clearFilters}
          wrapperClassName="h-fit"
          variant="minimal"
          colors="white"
        >
          Clear all
        </INTGButton>
      </div>
    </div>
  ) : null;
};

FilterBadges.propTypes = {
  filters: FiltersType.isRequired,
  clearFilters: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default FilterBadges;
