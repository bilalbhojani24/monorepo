import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TableBody = React.forwardRef(({ children, wrapperClassName }, ref) => (
  <tbody
    className={twClassNames('divide-base-200 divide-y', wrapperClassName)}
    ref={ref}
  >
    {children}
  </tbody>
));

TableBody.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
TableBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default TableBody;
