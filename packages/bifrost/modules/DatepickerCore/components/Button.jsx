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
