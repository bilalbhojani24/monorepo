import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import './styles.scss';

const TableRow = ({ children, wrapperClass, hover, selected }) => (
  <tr
    className={twClassNames(
      {
        'cursor-pointer hover:bg-base-50': hover,
        'bg-base-50': selected,
      },
      wrapperClass,
    )}
  >
    {children}
  </tr>
);

TableRow.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.string,
  hover: PropTypes.bool,
  selected: PropTypes.bool,
};
TableRow.defaultProps = {
  children: null,
  wrapperClass: '',
  hover: false,
  selected: false,
};

export default TableRow;
