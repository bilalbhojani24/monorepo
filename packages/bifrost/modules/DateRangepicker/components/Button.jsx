import React, { useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import Button from '../../Button';

export function CalendarButton(props) {
  const { children, disableChevron } = props;
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={twClassNames('rounded-full p-2 outline-none', {
        'cursor-not-allowed': disableChevron,
        'active:bg-base-200 focus:ring-brand-600 focus:ring-2': !disableChevron
      })}
    >
      {children}
    </Button>
  );
}

CalendarButton.propTypes = {
  children: Proptypes.node.isRequired,
  disableChevron: Proptypes.bool.isRequired
};

export function YearPickerButton(props) {
  const { children, disableChevron, onClick } = props;
  return (
    <Button
      onClick={onClick}
      className={twClassNames('rounded-full p-2 outline-none', {
        'cursor-not-allowed': disableChevron,
        'active:bg-base-200 focus:ring-brand-600 focus:ring-2': !disableChevron
      })}
    >
      {children}
    </Button>
  );
}
YearPickerButton.propTypes = {
  children: Proptypes.node.isRequired,
  disableChevron: Proptypes.bool.isRequired,
  onClick: Proptypes.func.isRequired
};

export function FieldButton(props) {
  const { children, isPressed: isCurrentlyPressed, disabled } = props;
  const ref = useRef();
  const { buttonProps, isPressed } = useButton(props, ref);

  return (
    <Button
      {...(disabled
        ? null
        : {
            ...buttonProps,
            tabIndex: '-1'
          })}
      disabled={disabled}
      ref={ref}
      className={twClassNames(
        'border-base-300 -ml-px rounded-r-md border-l px-3.5 outline-none',
        {
          'bg-base-300': isPressed || isCurrentlyPressed,
          'bg-base-50': !(isPressed || isCurrentlyPressed),
          'focus:ring-brand-600 focus:ring-2': !disabled,
          'cursor-not-allowed': disabled
        }
      )}
    >
      {children}
    </Button>
  );
}

FieldButton.propTypes = {
  children: Proptypes.node.isRequired,
  isPressed: Proptypes.bool,
  disabled: Proptypes.bool
};

FieldButton.defaultProps = {
  isPressed: false,
  disabled: false
};
