import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionListItem = ({ children, wrapperClassName }) => (
  <div className={twClassNames('py-4 sm:py-5 sm:px-6', wrapperClassName)}>
    {children}
  </div>
);

DescriptionListItem.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.node
};

DescriptionListItem.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default DescriptionListItem;
