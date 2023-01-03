import React from 'react';
import PropTypes from 'prop-types';

const Row = ({ children, className, index }) => {
  return (
    <tr className={className} tabIndex="-1" aria-rowindex={index}>
      {children}
    </tr>
  );
};

Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  index: PropTypes.number
};

export default Row;
