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
      className={`group-focus-within:border-brand-600 group-focus-within:group-hover:border-brand-600 -ml-px rounded-r-md border px-2 outline-none transition-colors ${
        isPressed || isCurrentlyPressed
          ? 'bg-base-200 border-base-400'
          : 'bg-base-50 border-base-300 group-hover:border-base-400'
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
