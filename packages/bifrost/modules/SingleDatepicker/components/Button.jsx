import React, { useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

export function CalendarButton(props) {
  const { children, disableChevron } = props;
  const ref = useRef();
  const { buttonProps } = useButton(props, ref);
  const { focusProps } = useFocusRing();
  return (
    <button
      type="button"
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={twClassNames('rounded-full p-2 outline-none', {
        'cursor-not-allowed': disableChevron,
        'active:bg-base-200 focus:ring-brand-600 focus:ring-2': !disableChevron
      })}
    >
      {children}
    </button>
  );
}

CalendarButton.propTypes = {
  children: Proptypes.node.isRequired,
  disableChevron: Proptypes.bool.isRequired
};

export function YearPickerButton(props) {
  const { children, disableChevron, onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className={twClassNames('rounded-full p-2 outline-none', {
        'cursor-not-allowed': disableChevron,
        'active:bg-base-200 focus:ring-brand-600 focus:ring-2': !disableChevron
      })}
    >
      {children}
    </button>
  );
}
YearPickerButton.propTypes = {
  children: Proptypes.node.isRequired,
  disableChevron: Proptypes.bool.isRequired,
  onClick: Proptypes.func.isRequired
};
