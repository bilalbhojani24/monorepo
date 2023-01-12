import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, index, onRowClick, row }) => (
  <tr
    className={className}
    tabIndex="-1"
    aria-rowindex={index}
    onClick={() => {
      if (onRowClick) onRowClick(row);
    }}
  >
    {children}
  </tr>
);

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onRowClick: PropTypes.func.isRequired,
  row: PropTypes.shape({}).isRequired,
};

export default Row;
