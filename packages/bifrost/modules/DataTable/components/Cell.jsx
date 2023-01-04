import React from 'react';
import PropTypes from 'prop-types';

const Cell = ({ children, className, index }) => {
  return (
    <td className={className} tabIndex="-1" aria-rowindex={index}>
      {children}
    </td>
  );
};

Cell.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  index: PropTypes.number
};

export default Cell;
