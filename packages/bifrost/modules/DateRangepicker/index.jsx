import React, { useEffect, useRef, useState } from 'react';
import { useDateRangePicker } from 'react-aria';
import { useDateRangePickerState } from 'react-stately';
import { useYearpicker } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import { CalendarIcon } from '../Icon';

import { FieldButton } from './components/Button';
import { DateField } from './components/DateField';
import { Dialog } from './components/Dialog';
import { Popover } from './components/Popover';
import { RangeCalendar } from './components/RangeCalendar';
import { PICKER_LEVELS, YEARS_DATA } from './const/DateRangepickerconst';
import { PickerLevelContext } from './context/PickerLevelContext';

const DateRangepicker = (props) => {
  const state = useDateRangePickerState(props);
  const ref = useRef();
  const {
    groupProps,
    labelProps,
    startFieldProps,
    endFieldProps,
    buttonProps,
    dialogProps,
    calendarProps
  } = useDateRangePicker(props, state, ref);

  const {
    label,
    errorMessage,
    disabled,
    offset,
    crossOffset,
    placement,
    wrapperClassName,
    isLoading
  } = props;

  const years = useYearpicker(YEARS_DATA, 12);
  useEffect(() => {
    years.jump(new Date().getFullYear() / 12 + 1);
  }, [years]);

  const [currentPicker, setCurrentPicker] = useState(PICKER_LEVELS[2]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [localYear, setLocalYear] = useState(new Date().getFullYear());
  return (
    <PickerLevelContext.Provider
      value={{
        years,
        currentPicker,
        setCurrentPicker,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        localYear,
        setLocalYear
      }}
    >
      <div className={twClassNames(wrapperClassName)}>
        {label && (
          <span
            {...labelProps}
            className="text-base-700 break-all text-sm font-medium leading-5"
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
            tabIndex="0"
            role="textbox"
            className={twClassNames(
              'border-base-300 flex w-full rounded-md border justify-between focus:outline-brand-500 focus:outline-1',
              {
                'border-danger-300': errorMessage
              }
            )}
          >
            <div
              className={twClassNames(
                'flex w-full items-center rounded-md rounded-r-none p-1 py-2 pl-3',
                {
                  'bg-base-50': disabled
                }
              )}
            >
              <DateField
                {...startFieldProps}
                disabled={disabled}
                errorMessage={errorMessage}
              />
              <span aria-hidden="true" className="px-2">
                –
              </span>
              <DateField
                {...endFieldProps}
                disabled={disabled}
                errorMessage={errorMessage}
              />
            </div>
            <FieldButton
              disabled={disabled}
              {...buttonProps}
              isPressed={state.isOpen}
            >
              <CalendarIcon
                aria-hidden="true"
                className={twClassNames('text-base-700 h-5 w-5', {
                  'text-base-300': disabled
                })}
              />
            </FieldButton>
          </div>
        </div>
        {errorMessage && (
          <p className="text-danger-600 mt-1.5 break-all text-sm font-normal leading-5">
            {errorMessage}
          </p>
        )}

        {state.isOpen && (
          <Popover
            triggerRef={ref}
            state={state}
            placement={placement}
            offset={offset}
            crossOffset={crossOffset}
          >
            <Dialog {...dialogProps}>
              <RangeCalendar isLoading={isLoading} {...calendarProps} />
            </Dialog>
          </Popover>
        )}
      </div>
    </PickerLevelContext.Provider>
  );
};

DateRangepicker.propTypes = {
  wrapperClassName: Proptypes.string,
  errorMessage: Proptypes.string,
  disabled: Proptypes.bool,
  onChange: Proptypes.func,
  isDateUnavailable: Proptypes.func,
  offset: Proptypes.number,
  crossOffset: Proptypes.number,
  placement: Proptypes.string,
  label: Proptypes.string,
  isLoading: Proptypes.bool
};
DateRangepicker.defaultProps = {
  wrapperClassName: '',
  errorMessage: null,
  disabled: false,
  onChange: () => {},
  isDateUnavailable: () => {},
  offset: 0,
  crossOffset: 0,
  placement: 'bottom end',
  label: '',
  isLoading: false
};

export default DateRangepicker;
