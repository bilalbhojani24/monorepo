import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES
} from 'features/AllBuilds/constants';
import { getAllAppliedFilters } from 'features/AllBuilds/slices/buildsSelectors';
import {
  clearFilters,
  setAppliedFilter
} from 'features/AllBuilds/slices/buildsSlice';

const FilterPills = () => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(getAllAppliedFilters);

  const handleRemoveTag = (item) => {
    dispatch(
      setAppliedFilter({
        type: BUILD_FILTER_TYPES[item.type],
        operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_ID,
        ...item
      })
    );
  };

  const handleRemoveAll = () => {
    dispatch(clearFilters());
  };
  if (!appliedFilters.length) {
    return null;
  }

  return (
    <div className="flex items-baseline">
      {!!appliedFilters.length && (
        <div className="inline-flex gap-4">
          <p className="text-base-500 text-sm">Filters</p>
          <div className="border-base-300 my-auto h-5 border-l" />
        </div>
      )}
      <div className="block">
        {appliedFilters.map((item) => {
          if (item.type === BUILD_FILTER_TYPES.search) {
            return null;
          }
          return (
            <O11yBadge
              key={item.text}
              hasDot={false}
              hasRemoveButton
              modifier="base"
              text={item.appliedText}
              onClose={() => handleRemoveTag(item)}
              wrapperClassName="bg-white font-medium  ml-4"
            />
          );
        })}
        {appliedFilters.length > 1 && (
          <O11yButton
            variant="minimal"
            colors="white"
            size="small"
            wrapperClassName="ml-4"
            onClick={handleRemoveAll}
          >
            Clear all
          </O11yButton>
        )}
      </div>
    </div>
  );
};

export default FilterPills;
