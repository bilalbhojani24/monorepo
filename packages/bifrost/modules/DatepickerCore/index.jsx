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

  const { errorMessage, disabled, wrapperClassName, disabledMessage } = props;

  return (
    <div className={wrapperClassName}>
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
        <Popover triggerRef={ref} state={state} placement="bottom start">
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
  wrapperClassName: Proptypes.string,
  disabledMessage: Proptypes.string.isRequired
};

DatePickerCore.defaultProps = {
  errorMessage: null,
  disabled: false,
  wrapperClassName: ''
};
