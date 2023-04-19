import React from 'react';
import PropTypes from 'prop-types';

import { O11yButton } from '../bifrostProxy';

function RadioSmallCards({ options, selectedItem, onChange }) {
  return options?.map((singleItem) => (
    <O11yButton
      key={singleItem.id}
      colors={singleItem.id === selectedItem.id ? 'brand' : 'white'}
      onClick={() => onChange(singleItem)}
      wrapperClassName="mb-2 mr-3"
      size="default"
    >
      {singleItem.name}
    </O11yButton>
  ));
}

export default RadioSmallCards;

RadioSmallCards.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
      name: PropTypes.string
    })
  ).isRequired,
  selectedItem: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.number, PropTypes.string]),
    name: PropTypes.string
  }).isRequired
};

RadioSmallCards.defaultProps = {};
