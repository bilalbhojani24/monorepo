import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TableRow = ({
  children,
  wrapperClassName,
  hover,
  onRowClick,
  selected,
  ...rest
}) => (
  <tr
    className={twClassNames(
      {
        'cursor-pointer hover:bg-base-50': hover || onRowClick,
        'bg-base-50': selected
      },
      wrapperClassName
    )}
    onClick={(e) => onRowClick?.(e)}
    onKeyDown={(e) => {
      if (e.key === 'Enter' && onRowClick) onRowClick(e);
      if (e.key === ' ' && onRowClick) onRowClick(e);
    }}
    {...(typeof onRowClick === 'function' && { role: 'tab' })}
    {...(typeof onRowClick === 'function' && { tabIndex: 0 })}
    {...rest}
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
