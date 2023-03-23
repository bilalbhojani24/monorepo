import React, { useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';

import DatePickerTrigger from '../DatepickerTrigger';

import { Calendar } from './components/Calendar';
import { Dialog } from './components/Dialog';
import { Popover } from './components/Popover';

const DatePickerBody = (props) => {
  const state = useDatePickerState(props);
  const ref = useRef();
  const { groupProps, fieldProps, buttonProps, dialogProps, calendarProps } =
    useDatePicker(props, state, ref);

  return (
    <div className="relative inline-flex flex-col text-left">
      <DatePickerTrigger
        groupProps={groupProps}
        fieldProps={fieldProps}
        buttonProps={buttonProps}
        triggerRef={ref}
        isOpen={state.isOpen}
      />
      {state.isOpen && (
        <Popover triggerRef={ref} state={state} placement="bottom start">
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};

export default DatePickerBody;
