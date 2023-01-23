import React from 'react';
import PropTypes from 'prop-types';

import { twClassNames } from '../../utils/tailwindUtils';

import './styles.scss';

const TableBody = ({ children, wrapperClass }) => (
  <tbody className={twClassNames('divide-base-200 divide-y', wrapperClass)}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
  wrapperClass: PropTypes.string,
};
TableBody.defaultProps = {
  children: null,
  wrapperClass: '',
};

export default TableBody;
