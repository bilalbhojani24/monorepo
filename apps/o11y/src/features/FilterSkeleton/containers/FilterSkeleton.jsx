import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yBadge,
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import isEmpty from 'lodash/isEmpty';
import PropTypes from 'prop-types';

import { setAppliedFilter } from '../slices/filterSlice';
import { getAllAppliedFilters, getIsFiltersLoading } from '../slices/selectors';

const FilterSkeleton = ({ children }) => {
  const dispatch = useDispatch();

  const isFilterLoading = useSelector(getIsFiltersLoading);
  const appliedFilters = useSelector(getAllAppliedFilters);

  const [showSlideOver, setShowSlideOver] = useState(false);

  const handleClose = () => {
    setShowSlideOver(false);
  };

  const handleApply = () => {
    setShowSlideOver(false);
  };

  const handleRemoveTag = (item) => {
    dispatch(
      setAppliedFilter({
        type: item.type,
        operationType: 'removeOperation',
        ...item
      })
    );
  };

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <O11yButton
          onClick={() => setShowSlideOver(true)}
          icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
          wrapperClassName="text-sm font-medium text-base-700 self-end"
          colors="white"
        >
          Filters
        </O11yButton>
      </div>
      {!isFilterLoading && !isEmpty(appliedFilters) && (
        <div className="">
          {appliedFilters.map((appliedFilter) => (
            <O11yBadge
              key={appliedFilter.id}
              text={appliedFilter.appliedText}
              isRounded
              hasRemoveButton
              onClose={() => {
                handleRemoveTag(appliedFilter);
              }}
            />
          ))}
        </div>
      )}
      <O11ySlideover
        show={showSlideOver}
        backgroundOverlay={false}
        size="sm"
        closeButtonOutside={false}
      >
        <O11ySlideoverHeader
          heading="Filters"
          headingWrapperClassName="text-base-900 text-lg font-medium leading-7"
          handleDismissClick={handleClose}
          wrapperClassName="pb-0"
        />
        <O11ySlideoverBody wrapperClassName="px-6 pb-0 border-b border-base-200">
          {showSlideOver && <>{children}</>}
        </O11ySlideoverBody>
        <O11ySlideoverFooter isBorder="true" position="right">
          <O11yButton variant="primary" colors="white" onClick={handleClose}>
            Cancel
          </O11yButton>
          <O11yButton onClick={handleApply}>Apply</O11yButton>
        </O11ySlideoverFooter>
      </O11ySlideover>
    </div>
  );
};

FilterSkeleton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

FilterSkeleton.defaultProps = {};

export default FilterSkeleton;
