import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const DescriptionList = ({ children, wrapperClassName }) => (
  <div
    className={twClassNames(
      'overflow-hidden bg-white shadow sm:rounded-lg',
      wrapperClassName
    )}
  >
    {children}
  </div>
);

DescriptionList.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
DescriptionList.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default DescriptionList;
