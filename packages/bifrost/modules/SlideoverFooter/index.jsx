import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { POSITION } from './const/slideoverFooterConstants';

import './styles.scss';

const SlideoverFooter = ({
  backgroundColorClass,
  children,
  isBorder,
  position
}) => (
  <div
    className={twClassNames(
      `sticky bottom-0 left-0 w-full space-y-2 space-x-3 px-6 py-4 sm:flex sm:space-y-0 ${backgroundColorClass}`,
      {
        'sm:justify-end': position === POSITION[1],
        'sm:justify-center': position === POSITION[2],
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
  isBorder: PropTypes.bool,
  position: PropTypes.oneOf(POSITION)
};
SlideoverFooter.defaultProps = {
  backgroundColorClass: '',
  children: null,
  isBorder: false,
  position: POSITION[0]
};

export default SlideoverFooter;
