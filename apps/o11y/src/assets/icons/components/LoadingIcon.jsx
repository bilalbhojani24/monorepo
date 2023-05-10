import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const LoadingIcon = ({ fill, className, ...rest }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={twClassNames('animate-spin', className)}
    {...rest}
  >
    <path d="M18 12c0-3.31-2.69-6-6-6V4c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8h2c0 3.31 2.69 6 6 6s6-2.69 6-6z" />
  </svg>
);

LoadingIcon.propTypes = {
  fill: PropTypes.string,
  className: PropTypes.string
};

LoadingIcon.defaultProps = {
  fill: '',
  className: ''
};

export default LoadingIcon;
