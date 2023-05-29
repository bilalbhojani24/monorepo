import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const Logo = ({ label, logo, wrapperClassName }) => (
  <img
    className={twClassNames('h-6 w-6 rounded-xl', wrapperClassName)}
    src={`${logo}`}
    alt={`${label}_logo`}
  />
);
Logo.propTypes = {
  label: PropTypes.string.isRequired,
  logo: PropTypes.string,
  wrapperClassName: PropTypes.string
};

Logo.defaultProps = {
  logo: null,
  wrapperClassName: ''
};

export default Logo;
