import React, { useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import Button from '../../Button';

export function CalendarButton(props) {
  const { children } = props;
  const ref = useRef();
  const { buttonProps, isDisabled } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={twClassNames('rounded-full p-2 outline-none', {
        'text-base-400': isDisabled,
        'hover:bg-base-100 active:bg-base-200 focus:ring-brand-600 focus:ring-2':
          !isDisabled
      })}
    >
      {children}
    </Button>
  );
}

CalendarButton.propTypes = {
  children: Proptypes.node.isRequired
};

export function FieldButton(props) {
  const { children, isPressed: isCurrentlyPressed } = props;
  const ref = useRef();
  const { buttonProps, isPressed } = useButton(props, ref);
  return (
    <Button
      {...buttonProps}
      ref={ref}
      className={`border-base-300 focus:ring-brand-600 -ml-px rounded-r-md border-l px-3.5 outline-none focus:ring-2 ${
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
