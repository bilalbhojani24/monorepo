import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionListHeader = ({ children, wrapperClassName }) => (
  <div className={twClassNames('px-4 py-5 sm:px-6', wrapperClassName)}>
    {children}
  </div>
);

DescriptionListHeader.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};

DescriptionListHeader.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default DescriptionListHeader;
