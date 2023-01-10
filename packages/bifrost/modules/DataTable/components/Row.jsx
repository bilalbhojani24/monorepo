import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, index }) => (
  <tr className={className} tabIndex="-1" aria-rowindex={index}>
    {children}
  </tr>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default Row;
