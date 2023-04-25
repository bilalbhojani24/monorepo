import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const InlineSlideOverBody = ({ children, wrapperClassName }) => (
  <div
    className={twClassNames(
      'flex-1 overflow-auto -mx-4 px-4',
      wrapperClassName
    )}
  >
    {children}
  </div>
);

InlineSlideOverBody.displayName = 'InlineSlideOver.Body';
InlineSlideOverBody.propTypes = {
  children: PropTypes.node,
  wrapperClassName: PropTypes.string
};
InlineSlideOverBody.defaultProps = {
  children: null,
  wrapperClassName: ''
};

export default InlineSlideOverBody;
