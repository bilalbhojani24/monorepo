import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const TableBody = ({ children, wrapperClassName }) => (
  <tbody className={twClassNames('divide-base-200 divide-y', wrapperClassName)}>
    {children}
  </tbody>
);

TableBody.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
TableBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default TableBody;
