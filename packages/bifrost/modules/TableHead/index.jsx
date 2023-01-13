import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TableHead = ({ children, className }) => (
  <thead className={`bg-base-50 ${className}`}>{children}</thead>
);

TableHead.propTypes = {
  children: PropTypes.node,
  className: PropTypes.node,
};
TableHead.defaultProps = {
  children: null,
  className: '',
};

export default TableHead;
