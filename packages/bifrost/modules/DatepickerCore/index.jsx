import React, { useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import Proptypes from 'prop-types';

import DatePickerInputGroup from '../DatePickerInputGroup';

import { Calendar } from './components/Calendar';
import { Dialog } from './components/Dialog';
import { Popover } from './components/Popover';

const DatePickerCore = (props) => {
  const state = useDatePickerState(props);
  const ref = useRef();
  const { groupProps, fieldProps, buttonProps, dialogProps, calendarProps } =
    useDatePicker(props, state, ref);

  const {
    errorMessage,
    disabled,
    disabledMessage,
    offset,
    crossOffset,
    placement
  } = props;

  return (
    <div aria-label="Date input field and calendar viewer">
      <DatePickerInputGroup
        errorMessage={errorMessage}
        groupProps={groupProps}
        fieldProps={fieldProps}
        buttonProps={buttonProps}
        triggerRef={ref}
        isOpen={state.isOpen}
        disabled={disabled}
        disabledMessage={disabledMessage}
      />
      {state.isOpen && (
        <Popover
          triggerRef={ref}
          state={state}
          placement={placement}
          offset={offset}
          crossOffset={crossOffset}
        >
          <Dialog {...dialogProps}>
            <Calendar {...calendarProps} />
          </Dialog>
        </Popover>
      )}
    </div>
  );
};

export default DatePickerCore;

DatePickerCore.propTypes = {
  errorMessage: Proptypes.string,
  disabled: Proptypes.bool,
  disabledMessage: Proptypes.string.isRequired,
  offset: Proptypes.number,
  crossOffset: Proptypes.number,
  placement: Proptypes.string
};

DatePickerCore.defaultProps = {
  errorMessage: null,
  disabled: false,
  offset: 0,
  crossOffset: 0,
  placement: 'bottom end'
};
