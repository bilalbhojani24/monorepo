import React from 'react';
import { MdFilterAlt } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

const FilterSlideoverTrigger = ({ onClick }) => (
  <O11yButton
    onClick={onClick}
    icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
    wrapperClassName="text-sm font-medium text-base-700 self-end"
    colors="white"
    size="default"
  >
    Filters
  </O11yButton>
);

FilterSlideoverTrigger.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default FilterSlideoverTrigger;
