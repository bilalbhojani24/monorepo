import React, { useRef } from 'react';
import { useButton } from 'react-aria';
import Proptypes from 'prop-types';

import Button from '../../Button';

export function FieldButton(props) {
  const { children, isPressed: isCurrentlyPressed } = props;
  const ref = useRef();
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={`border-base-300 -ml-px rounded-r-md border-l px-3.5 outline-none ${
        isPressed || isCurrentlyPressed ? 'bg-base-300' : 'bg-base-50'
      }`}
    >
      {children}
    </Button>
  );
}

FieldButton.propTypes = {
  children: Proptypes.node.isRequired,
  isPressed: Proptypes.bool
};

FieldButton.defaultProps = {
  isPressed: false
};
