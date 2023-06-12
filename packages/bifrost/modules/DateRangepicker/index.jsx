import React, { useEffect, useRef, useState } from 'react';
import { useDateRangePicker } from 'react-aria';
import { useDateRangePickerState } from 'react-stately';
import { useYearpicker } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import * as Popover from '@radix-ui/react-popover';
import Proptypes from 'prop-types';

import { CalendarIcon } from '../Icon';

import { DateField } from './components/DateField';
import { Dialog } from './components/Dialog';
import { RangeCalendar } from './components/RangeCalendar';
import { PICKER_LEVELS, YEARS_DATA } from './const/DateRangepickerconst';
import { PickerLevelContext } from './context/PickerLevelContext';

const DateRangepicker = (props) => {
  const state = useDateRangePickerState(props);
  const ref = useRef();
  const triggerRef = useRef();
  const {
    labelProps,
    startFieldProps,
    endFieldProps,
    dialogProps,
    calendarProps
  } = useDateRangePicker(props, state, ref);

  const {
    label,
    errorMessage,
    disabled,
    offset,
    crossOffset,
    align,
    side,
    wrapperClassName,
    isLoading
  } = props;

  const years = useYearpicker(YEARS_DATA, 12);
  useEffect(() => {
    years.jump(new Date().getFullYear() / 12 + 1);
  }, [years]);

  useEffect(() => {
    if (state.start !== null && state.end !== null) triggerRef.current?.click();
  }, [state.value, state.start, state.end]);

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
            ref={ref}
            className={twClassNames(
              'border-base-300 flex w-full rounded-md border justify-between focus:outline-brand-500 focus:outline-1',
              {
                'border-danger-300': errorMessage,
                'focus-within:border-brand-500 focus-within:border-2': !disabled
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
                aria-label="some reader text"
                {...startFieldProps}
                disabled={disabled}
                errorMessage={errorMessage}
              />
              <span
                aria-hidden="true"
                className={twClassNames('px-2 text-base-500', {
                  'text-base-500': disabled,
                  'text-danger-900': errorMessage
                })}
              >
                –
              </span>
              <DateField
                {...endFieldProps}
                disabled={disabled}
                errorMessage={errorMessage}
              />
            </div>

            <Popover.Root defaultOpen={false}>
              <Popover.Trigger asChild>
                <button
                  aria-label="calendar dropdown trigger"
                  type="button"
                  disabled={disabled}
                  className={twClassNames(
                    'border-base-300 -ml-px rounded-r-md border-l px-3.5 bg-white hover:bg-base-50 focus:outline-brand-500 focus:border-2',
                    {
                      'cursor-not-allowed bg-base-50': disabled
                    }
                  )}
                >
                  <CalendarIcon
                    aria-hidden="true"
                    className={twClassNames('text-base-400 h-5 w-5', {
                      'text-base-300': disabled
                    })}
                  />
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  align={align}
                  side={side}
                  sideOffset={crossOffset}
                  alignOffset={offset}
                >
                  <div className="border-base-300 z-10 mt-2 rounded-md border bg-white p-3 shadow-lg">
                    <Dialog {...dialogProps} isLoading={isLoading}>
                      <RangeCalendar isLoading={isLoading} {...calendarProps} />
                    </Dialog>
                  </div>
                  <Popover.Close ref={triggerRef} aria-hidden="true" />
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
        {errorMessage && (
          <p className="text-danger-600 mt-1.5 break-all text-sm font-normal leading-5">
            {errorMessage}
          </p>
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
  align: Proptypes.string,
  side: Proptypes.string,
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
  align: 'end',
  side: 'bottom',
  label: '',
  isLoading: false
};

export default DateRangepicker;
