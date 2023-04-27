import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yBadge } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';

import {
  clearAllAppliedFilters,
  setAppliedFilter
} from '../slices/filterSlice';
import { getAllAppliedFilters, getIsFiltersLoading } from '../slices/selectors';

const FilterPills = () => {
  const dispatch = useDispatch();

  const isFilterLoading = useSelector(getIsFiltersLoading);
  const appliedFilters = useSelector(getAllAppliedFilters);
  const handleRemoveTag = (item) => {
    dispatch(
      setAppliedFilter({
        type: item.type,
        operationType: 'removeOperation',
        ...item
      })
    );
  };

  const handleRemoveAll = () => {
    dispatch(clearAllAppliedFilters());
  };
  if (isFilterLoading || isEmpty(appliedFilters)) {
    return null;
  }
  return (
    <div className="flex items-center gap-2">
      <div className="border-base-300 flex items-center self-stretch border-r pr-2">
        <span className="text-base-500  text-sm leading-5">Filters</span>
      </div>
      <div className="flex flex-wrap gap-x-2 gap-y-1">
        {appliedFilters.map((appliedFilter) => (
          <O11yBadge
            key={appliedFilter.id}
            text={appliedFilter.appliedText}
            isRounded
            hasRemoveButton
            onClose={() => {
              handleRemoveTag(appliedFilter);
            }}
            wrapperClassName="bg-white hover:bg-base-50 ring-1 ring-base-200"
          />
        ))}
        <button
          className="text-base-700 text-sm font-medium leading-4 "
          onClick={handleRemoveAll}
          type="button"
        >
          Clear all
        </button>
      </div>
    </div>
  );
};

FilterPills.propTypes = {};

export default FilterPills;
