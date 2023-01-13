import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TableBody = ({ children, className }) => (
  <tbody className={`divide-base-200 divide-y ${className}`}>{children}</tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
TableBody.defaultProps = {
  children: null,
  className: '',
};

export default TableBody;
