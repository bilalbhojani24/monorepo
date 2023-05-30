import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import {
  discardUnAppliedFilters,
  resetFilters,
  setSelectedFilterAsApplied
} from '../slices/filterSlice';

const FilterSlideover = ({ children, show, onClose, onApply }) => {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      dispatch(resetFilters());
    },
    [dispatch]
  );

  const handleClose = () => {
    dispatch(discardUnAppliedFilters());
    onClose();
  };

  const handleApply = () => {
    dispatch(setSelectedFilterAsApplied());
    onApply();
  };

  return (
    <O11ySlideover
      show={show}
      backgroundOverlay={false}
      size="sm"
      closeButtonOutside={false}
      onEscPress={handleClose}
    >
      <O11ySlideoverHeader
        heading="Filters"
        headingWrapperClassName="text-base-900 text-lg font-medium leading-7"
        handleDismissClick={handleClose}
        wrapperClassName="pb-0"
      />
      <O11ySlideoverBody wrapperClassName="px-6 pb-0 border-b border-base-200">
        {show && <>{children}</>}
      </O11ySlideoverBody>
      <O11ySlideoverFooter isBorder="true" position="right">
        <O11yButton variant="primary" colors="white" onClick={handleClose}>
          Cancel
        </O11yButton>
        <O11yButton onClick={handleApply}>Apply</O11yButton>
      </O11ySlideoverFooter>
    </O11ySlideover>
  );
};

FilterSlideover.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired
};

FilterSlideover.defaultProps = {};

export default FilterSlideover;
