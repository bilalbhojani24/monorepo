import React from 'react';
import {
  INTGSelectMenu,
  INTGSelectMenuLabel,
  INTGSelectMenuOptionGroup,
  INTGSelectMenuOptionItem,
  INTGSelectMenuTrigger
} from 'common/bifrostProxy';
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
    setFilters((prev) => ({ ...prev, [filterKey]: value }));
  };
  return (
    <INTGSelectMenu onChange={handleChange} value={filters[filterKey]} isMulti>
      {label && <INTGSelectMenuLabel>{label}</INTGSelectMenuLabel>}
      <div data-test-id={`select-${filterKey}-filter`}>
        <INTGSelectMenuTrigger
          placeholder={placeholder}
          wrapperClassName={triggerClassName}
        />
      </div>
      {Boolean(options?.length) && (
        <INTGSelectMenuOptionGroup>
          {options.map((item) => (
            <INTGSelectMenuOptionItem key={item.value} option={item} />
          ))}
        </INTGSelectMenuOptionGroup>
      )}
    </INTGSelectMenu>
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
