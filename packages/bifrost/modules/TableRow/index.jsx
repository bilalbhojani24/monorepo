import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const TableRow = ({
  children,
  wrapperClassName,
  hover,
  onRowClick,
  selected
}) => (
  <tr
    className={twClassNames(
      {
        'cursor-pointer hover:bg-base-50': hover || onRowClick,
        'bg-base-50': selected
      },
      wrapperClassName
    )}
    onClick={() => onRowClick?.()}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && onRowClick) onRowClick(e);
      if (e.key === ' ' && onRowClick) onRowClick(e);
    }}
    tabIndex={typeof onRowClick === 'function' ? 0 : -1}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string,
  hover: PropTypes.bool,
  onRowClick: PropTypes.func,
  selected: PropTypes.bool
};
TableRow.defaultProps = {
  children: null,
  wrapperClassName: '',
  hover: false,
  onRowClick: null,
  selected: false
};

export default TableRow;
