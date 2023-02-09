import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const TableRow = ({ children, wrapperClass, hover, onRowClick, selected }) => (
  <tr
    className={twClassNames(
      {
        'cursor-pointer hover:bg-base-50': hover || onRowClick,
        'bg-base-50': selected
      },
      wrapperClass
    )}
    onClick={() => onRowClick?.()}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.string,
  hover: PropTypes.bool,
  onRowClick: PropTypes.func,
  selected: PropTypes.bool
};
TableRow.defaultProps = {
  children: null,
  wrapperClass: '',
  hover: false,
  onRowClick: null,
  selected: false
};

export default TableRow;
