import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { FILTER_OPERATION_TYPE } from '../constants';
import {
  clearAllAppliedFilters,
  setAppliedFilter
} from '../slices/filterSlice';
import {
  getIsFiltersLoading,
  getSlideoverFiltersApplied
} from '../slices/selectors';

const FilterPills = ({
  rightNode,
  wrapperClassName,
  onRemoveSingleFilter,
  onRemoveAll
}) => {
  const dispatch = useDispatch();

  const isFilterLoading = useSelector(getIsFiltersLoading);
  const appliedFilters = useSelector(getSlideoverFiltersApplied());
  const handleRemoveTag = (item) => {
    dispatch(
      setAppliedFilter({
        type: item.type,
        operationType: FILTER_OPERATION_TYPE.REMOVE_OPERATION,
        ...item
      })
    );
    onRemoveSingleFilter(item.type);
  };

  const handleRemoveAll = () => {
    dispatch(clearAllAppliedFilters());
    onRemoveAll();
  };

  if (isFilterLoading || isEmpty(appliedFilters)) {
    return null;
  }
  return (
    <div
      className={twClassNames(
        'flex items-center justify-between mt-4',
        wrapperClassName
      )}
    >
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
      {rightNode && <>{rightNode}</>}
    </div>
  );
};

FilterPills.propTypes = {
  rightNode: PropTypes.node,
  wrapperClassName: PropTypes.string,
  onRemoveSingleFilter: PropTypes.func,
  onRemoveAll: PropTypes.func
};

FilterPills.defaultProps = {
  rightNode: null,
  wrapperClassName: '',
  onRemoveSingleFilter: () => {},
  onRemoveAll: () => {}
};

export default FilterPills;
