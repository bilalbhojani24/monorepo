import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const InputGroupAddOn = ({ children, wrapperClassName, position, inline }) => {
  const classes = {
    start: 'border-r-0 rounded-r-none',
    end: 'border-l-0 rounded-l-none'
  };
  return (
    <p
      className={twClassNames(
        'text-base-500 flex items-center rounded-md',
        { 'border border-base-300 px-3': !inline },
        classes[position],
        wrapperClassName
      )}
    >
      {children}
    </p>
  );
};

InputGroupAddOn.propTypes = {
  children: PropTypes.node.isRequired,
  wrapperClassName: PropTypes.string,
  position: PropTypes.oneOf(['start', 'end']),
  inline: PropTypes.bool
};

InputGroupAddOn.defaultProps = {
  wrapperClassName: '',
  position: 'start',
  inline: false
};

export default InputGroupAddOn;
