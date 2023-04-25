import React, { useState } from 'react';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const FilterSkeleton = ({ children }) => {
  const [showSlideOver, setShowSlideOver] = useState(false);

  const handleClose = () => {
    setShowSlideOver(false);
  };

  const handleApply = () => {
    setShowSlideOver(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <O11yButton
          onClick={() => setShowSlideOver(true)}
          icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
          wrapperClassName="text-sm font-medium text-base-700 self-end"
          colors="white"
        >
          Filters
        </O11yButton>
      </div>
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
