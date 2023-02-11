import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const SlideoverFooter = ({ backgroundColorClass, children, isBorder }) => (
  <div
    className={twClassNames(
      `sticky bottom-0 left-0 w-full space-y-2 space-x-3 px-6 py-4 sm:flex sm:space-y-0 ${backgroundColorClass}`,
      {
        'border-t border-base-300': isBorder
      }
    )}
  >
    {children}
  </div>
);

SlideoverFooter.propTypes = {
  backgroundColorClass: PropTypes.string,
  children: PropTypes.node,
  isBorder: PropTypes.bool
};
SlideoverFooter.defaultProps = {
  backgroundColorClass: '',
  children: null,
  isBorder: false
};

export default SlideoverFooter;
