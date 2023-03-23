import React, { useRef } from 'react';
import { mergeProps, useButton, useFocusRing } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import Button from '../../Button';

export function CalendarButton(props) {
  const { children } = props;
  const ref = useRef();
  const { buttonProps, isDisabled } = useButton(props, ref);
  const { focusProps, isFocusVisible } = useFocusRing();
  return (
    <Button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={twClassNames('rounded-full p-2 outline-none', {
        'text-base-400': isDisabled,
        'hover:bg-brand-100 active:bg-brand-200': !isDisabled,
        'ring-brand-600 ring-2 ring-offset-2': isFocusVisible
      })}
    >
      {children}
    </Button>
  );
}

CalendarButton.propTypes = {
  children: Proptypes.node.isRequired
};
