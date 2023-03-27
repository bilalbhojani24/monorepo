import React, { useRef } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import {
  CalendarIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon
} from '../Icon';
import Tooltip from '../Tooltip';
import TooltipBody from '../TooltipBody';

import { FieldButton } from './components/Button';
import { Calendar } from './components/Calendar';
import { DateField } from './components/DateField';
import { Dialog } from './components/Dialog';
import { Popover } from './components/Popover';

const SingleDatepicker = (props) => {
  const state = useDatePickerState(props);
  const ref = useRef();
  const {
    groupProps,
    labelProps,
    fieldProps,
    buttonProps,
    dialogProps,
    calendarProps
  } = useDatePicker(props, state, ref);

  const {
    label,
    errorMessage,
    disabled,
    disabledMessage,
    offset,
    crossOffset,
    placement,
    wrapperClassName
  } = props;

  return (
    <div className="relative inline-flex w-full flex-col text-left">
      {label && (
        <span
          {...labelProps}
          className="text-base-700 text-sm font-medium leading-5"
        >
          {label}
        </span>
      )}

      <div
        className={twClassNames(wrapperClassName, {
          'cursor-not-allowed': disabled
        })}
      >
        <div
          {...groupProps}
          ref={ref}
          className={twClassNames(
            'border-base-300 flex w-full rounded-md border',
            {
              'border-danger-300': errorMessage,
              'hover:border-brand-500': !disabled
            }
          )}
        >
          <div className="relative flex w-full items-center rounded-md rounded-r-none p-1 py-2 pl-3">
            <DateField
              {...fieldProps}
              disabled={disabled}
              errorMessage={errorMessage}
            />
          </div>
          {errorMessage ? (
            <div className="flex flex-col justify-around">
              <ExclamationCircleIcon
                className="text-danger-500 mr-4 h-5 w-5"
                aria-hidden="true"
              />
            </div>
          ) : null}
          {disabled ? (
            <div className="flex flex-col justify-around">
              <Tooltip
                content={
                  <TooltipBody wrapperClassName="mb-0">
                    {disabledMessage}
                  </TooltipBody>
                }
                theme="dark"
              >
                <QuestionMarkCircleIcon
                  className="text-base-400 mr-4 h-5 w-5 cursor-pointer"
                  aria-hidden="true"
                />
              </Tooltip>
            </div>
          ) : (
            <FieldButton {...buttonProps} isPressed={state.isOpen}>
              <CalendarIcon className="text-base-400 h-5 w-5" />
            </FieldButton>
          )}
        </div>
        <p className="text-danger-600 mt-1.5 break-all text-sm font-normal leading-5">
          {errorMessage}
        </p>
      </div>
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

SingleDatepicker.propTypes = {
  wrapperClassName: Proptypes.string,
  errorMessage: Proptypes.string,
  disabled: Proptypes.bool,
  onChange: Proptypes.func,
  disabledMessage: Proptypes.string,
  isDateUnavailable: Proptypes.func,
  offset: Proptypes.number,
  crossOffset: Proptypes.number,
  placement: Proptypes.string,
  label: Proptypes.string
};
SingleDatepicker.defaultProps = {
  wrapperClassName: '',
  errorMessage: null,
  disabled: false,
  onChange: () => {},
  disabledMessage: 'Datepicker has been disabled',
  isDateUnavailable: () => {},
  offset: 0,
  crossOffset: 0,
  placement: 'bottom end',
  label: ''
};

export default SingleDatepicker;
