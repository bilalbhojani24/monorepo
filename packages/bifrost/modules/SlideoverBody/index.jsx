import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const SlideoverBody = ({ children, wrapperClassName }) => (
  <div
    className={twClassNames(`overflow-scroll py-4 flex-1`, wrapperClassName)}
    tabIndex={0}
    role="scrollbar"
    aria-valuenow={0}
    aria-controls=""
  >
    {children}
  </div>
);

SlideoverBody.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
SlideoverBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default SlideoverBody;
