import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const InlineSlideOverContainer = forwardRef(
  ({ children, wrapperClassName }, ref) => (
    <div
      ref={ref}
      className={twClassNames(
        'absolute h-full overflow-auto max-w-md bg-white right-0 top-0 z-10 p-4 shadow-lg flex flex-col',
        wrapperClassName
      )}
    >
      {children}
    </div>
  )
);
InlineSlideOverContainer.displayName = 'InlineSlideOver.Container';
InlineSlideOverContainer.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
InlineSlideOverContainer.defaultProps = {
  children: null,
  wrapperClassName: ''
};
export default InlineSlideOverContainer;
