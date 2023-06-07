import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yBadge } from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { ADV_FILTER_TYPES, FILTER_OPERATION_TYPE } from '../constants';
import {
  clearAllAppliedFilters,
  setAppliedFilter
} from '../slices/filterSlice';
import { getAllAppliedFilters, getIsFiltersLoading } from '../slices/selectors';

const FilterPills = ({ rightNode, wrapperClassName }) => {
  const dispatch = useDispatch();

  const isFilterLoading = useSelector(getIsFiltersLoading);
  const appliedFilters = useSelector(getAllAppliedFilters);
  const handleRemoveTag = (item) => {
    dispatch(
      setAppliedFilter({
        type: item.type,
        operationType: FILTER_OPERATION_TYPE.REMOVE_OPERATION,
        ...item
      })
    );
  };

  const handleRemoveAll = () => {
    dispatch(clearAllAppliedFilters());
  };

  const allAppliedFilters = useMemo(
    () =>
      appliedFilters.filter(
        (appFilter) =>
          ![
            ADV_FILTER_TYPES.search.key,
            ADV_FILTER_TYPES.dateRange.key
          ].includes(appFilter.type)
      ),
    [appliedFilters]
  );

  if (isFilterLoading || isEmpty(allAppliedFilters)) {
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
          {allAppliedFilters.map((appliedFilter) => (
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
  wrapperClassName: PropTypes.string
};

FilterPills.defaultProps = {
  rightNode: null,
  wrapperClassName: ''
};

export default FilterPills;
