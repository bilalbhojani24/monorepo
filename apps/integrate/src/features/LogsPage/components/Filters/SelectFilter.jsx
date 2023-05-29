import React from 'react';
import {
  SelectMenu,
  SelectMenuLabel,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger
} from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import { FiltersType } from './types';

const SelectFilter = ({
  label,
  filters,
  options,
  filterKey,
  setFilters,
  placeholder,
  triggerClassName
}) => {
  const handleChange = (value) => {
    if (typeof setFilters === 'function') {
      setFilters((prev) => ({ ...prev, [filterKey]: value }));
    }
  };
  return (
    <SelectMenu onChange={handleChange} value={filters[filterKey]} isMulti>
      {label && <SelectMenuLabel>{label}</SelectMenuLabel>}
      <SelectMenuTrigger
        placeholder={placeholder}
        wrapperClassName={triggerClassName}
      />
      {Boolean(options?.length) && (
        <SelectMenuOptionGroup>
          {options.map((item) => (
            <SelectMenuOptionItem key={item.value} option={item} />
          ))}
        </SelectMenuOptionGroup>
      )}
    </SelectMenu>
  );
};

SelectFilter.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired
    })
  ).isRequired,
  filters: FiltersType.isRequired,
  filterKey: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  triggerClassName: PropTypes.string
};

SelectFilter.defaultProps = {
  triggerClassName: ''
};

export default SelectFilter;
