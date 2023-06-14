import React, { useCallback, useState } from 'react';
import { MdOutlineSearch } from '@browserstack/bifrost';
import { makeDebounce } from '@browserstack/utils';
import { INTGInputField, INTGInputGroupAddOn } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { FiltersType } from './types';

const QueryFilter = ({ filters, setFilters, filterKey }) => {
  const [inputValue, setInputValue] = useState(filters?.query ?? '');
  const handleQueryChange = (query) => {
    setFilters({ ...filters, [filterKey]: query });
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedQueryChange = useCallback(
    makeDebounce(handleQueryChange, 500),
    [filters]
  );
  const handleChange = (e) => {
    const query = e?.target?.value;
    setInputValue(query);
    debouncedQueryChange(query);
  };
  return (
    <INTGInputField
      value={inputValue}
      id="search-by-url-input"
      onChange={handleChange}
      wrapperClassName="bg-white w-80 rounded-md z-0"
      placeholder="Search by URL"
      addOnBeforeInline={
        <INTGInputGroupAddOn inline>
          <MdOutlineSearch className="h-5 w-5" />
        </INTGInputGroupAddOn>
      }
    />
  );
};

QueryFilter.propTypes = {
  filters: FiltersType.isRequired,
  filterKey: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired
};

export default QueryFilter;
