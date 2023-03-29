import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../../Button';

const InputGroupButton = ({
  children,
  position,
  childWrapperClassName,
  ...props
}) => {
  const classes = {
    start: 'border-r-0 rounded-r-none',
    end: 'border-l-0 rounded-l-none'
  };
  return (
    <Button
      variant="minimal"
      wrapperClassName={twClassNames(
        'border border-base-300',
        classes[position]
      )}
      {...props}
    >
      <span
        className={twClassNames(
          'text-base-500 flex space-x-1.5 px-3',
          childWrapperClassName
        )}
      >
        {children}
      </span>
    </Button>
  );
};

InputGroupButton.propTypes = {
  children: PropTypes.node.isRequired,
  childWrapperClassName: PropTypes.string,
  position: PropTypes.oneOf(['start', 'end'])
};

InputGroupButton.defaultProps = {
  childWrapperClassName: '',
  position: 'start'
};

export default InputGroupButton;
