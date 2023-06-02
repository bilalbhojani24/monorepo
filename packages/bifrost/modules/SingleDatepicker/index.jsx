import React, { useEffect, useRef, useState } from 'react';
import { useDatePicker } from 'react-aria';
import { useDatePickerState } from 'react-stately';
import { useYearpicker } from '@browserstack/hooks';
import { twClassNames } from '@browserstack/utils';
import Proptypes from 'prop-types';

import { CalendarIcon } from '../Icon';

import { Calendar } from './components/Calendar';
import { DateField } from './components/DateField';
import { Dialog } from './components/Dialog';
import RPopover from './components/RPopover';
import { PICKER_LEVELS, YEARS_DATA } from './const/singleDatepicker';
import { PickerLevelContext } from './context/PickerLevelContext';

const SingleDatepicker = (props) => {
  const state = useDatePickerState(props);
  const ref = useRef();
  const { labelProps, fieldProps, dialogProps, calendarProps } = useDatePicker(
    props,
    state,
    ref
  );

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
            className="text-base-700 mb-1 block break-all text-sm font-medium leading-5"
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
              'border-base-300 cursor-pointer flex w-full rounded-md border justify-between',
              {
                'border-danger-300': errorMessage,
                'cursor-not-allowed': disabled,
                'focus-within:border-brand-500 focus-within:border-2': !disabled
              }
            )}
          >
            <div
              className={twClassNames(
                'flex w-full items-center rounded-md rounded-r-none p-1 py-2.5 pl-3',
                {
                  'bg-base-50': disabled
                }
              )}
            >
              <DateField
                {...fieldProps}
                disabled={disabled}
                errorMessage={errorMessage}
              />
            </div>
            <RPopover
              sideOffset={crossOffset}
              alignOffset={offset}
              align={align}
              side={side}
              trigger={
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
              }
              content={
                <div className="border-base-300 z-10 mt-2 rounded-md border bg-white p-3 shadow-lg">
                  <Dialog {...dialogProps} isLoading={isLoading}>
                    <Calendar isLoading={isLoading} {...calendarProps} />
                  </Dialog>
                </div>
              }
            />
          </div>
        </div>
        {errorMessage && (
          <p className="text-danger-600 mt-2 break-all text-sm font-normal leading-5">
            {errorMessage}
          </p>
        )}
      </div>
    </PickerLevelContext.Provider>
  );
};

SingleDatepicker.propTypes = {
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
SingleDatepicker.defaultProps = {
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

export default SingleDatepicker;
