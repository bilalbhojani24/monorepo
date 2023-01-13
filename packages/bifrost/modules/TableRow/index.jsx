import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import './styles.scss';

const TableRow = ({ children, className, hover, selected }) => (
  <tr
    className={`${className} ${classNames({
      'cursor-pointer hover:bg-base-50': hover,
      'bg-base-50': selected,
    })}`}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
};
TableRow.defaultProps = {
  children: null,
  className: '',
  hover: false,
  selected: false,
};

export default TableRow;
