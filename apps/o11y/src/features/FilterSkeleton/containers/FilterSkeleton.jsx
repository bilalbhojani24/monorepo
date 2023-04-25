import React, { useEffect } from 'react';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const FilterSkeleton = ({ onInit, onClose, onApply, children, isVisible }) => {
  useEffect(() => {
    onInit();
  }, [onInit]);
  return (
    <O11ySlideover
      show={isVisible}
      backgroundOverlay={false}
      size="sm"
      closeButtonOutside={false}
    >
      <O11ySlideoverHeader
        heading="Filters"
        headingWrapperClassName="text-base-900 text-lg font-medium leading-7"
        handleDismissClick={onClose}
        wrapperClassName="pb-0"
      />
      <O11ySlideoverBody wrapperClassName="px-6 pb-0 border-b border-base-200">
        {children}
      </O11ySlideoverBody>
      <O11ySlideoverFooter isBorder="true" position="right">
        <O11yButton variant="primary" colors="white" onClick={onClose}>
          Cancel
        </O11yButton>
        <O11yButton onClick={onApply}>Apply</O11yButton>
      </O11ySlideoverFooter>
    </O11ySlideover>
  );
};

FilterSkeleton.propTypes = {
  onInit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onApply: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  isVisible: PropTypes.bool.isRequired
};

export default FilterSkeleton;
