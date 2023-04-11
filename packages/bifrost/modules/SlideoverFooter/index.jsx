import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const SlideoverFooter = ({ wrapperClassName, children, isBorder }) => (
  <div
    className={twClassNames(
      'sticky bottom-0 left-0 w-full space-y-2 space-x-3 px-6 py-4 sm:flex sm:space-y-0',
      {
        'border-t border-base-300': isBorder
      },
      wrapperClassName
    )}
  >
    {children}
  </div>
);

SlideoverFooter.propTypes = {
  wrapperClassName: PropTypes.string,
  children: PropTypes.node,
  isBorder: PropTypes.bool
};
SlideoverFooter.defaultProps = {
  wrapperClassName: '',
  children: null,
  isBorder: false
};

export default SlideoverFooter;
