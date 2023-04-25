/* eslint-disable sonarjs/no-duplicate-string */
import React, { useContext, useRef } from 'react';
import { useLocale, useRangeCalendar } from 'react-aria';
import { useRangeCalendarState } from 'react-stately';
import { twClassNames } from '@browserstack/utils';
import { createCalendar } from '@internationalized/date';
import Proptype from 'prop-types';

import Button from '../../Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../../Icon';
import Loader from '../../Loader';
import {
  MONTHS_DATA,
  MONTHS_DATA_JSON,
  PICKER_LEVELS
} from '../const/DateRangepickerconst';
import { PickerLevelContext } from '../context/PickerLevelContext';

import { CalendarButton, YearPickerButton } from './Button';
import { CalendarGrid } from './CalendarGrid';
import MonthGrid from './MonthGrid';
import YearGrid from './YearGrid';

export function RangeCalendar(props) {
  const {
    years,
    currentPicker,
    setCurrentPicker,
    selectedYear,
    selectedMonth,
    setSelectedYear,
    setSelectedMonth
  } = useContext(PickerLevelContext);
  const { minValue, maxValue, isLoading } = props;
  const { locale } = useLocale();
  const state = useRangeCalendarState({
    ...props,
    locale,
    createCalendar
  });

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useRangeCalendar(props, state, ref);

  const jumpToPreviousYear = () => {
    if (years.currentPage === 1 || years.currentData()[0] <= minValue?.year)
      return;
    years.prev();
  };

  const jumpToNextYear = () => {
    if (
      years.maxPage === years.currentPage ||
      years.currentData()[11] >= maxValue?.year
    )
      return;
    years.next();
  };

  const updateTitleOnChevronClick = () => {
    setSelectedYear(title.split(' ')[1]);
    setSelectedMonth(MONTHS_DATA_JSON[title.split(' ')[0]]);
  };

  return (
    <div {...calendarProps} ref={ref} className="inline-block">
      {isLoading ? (
        <div className="mx-36 my-40 py-3.5">
          <Loader
            height="h-9"
            width="w-9"
            wrapperClassName="text-base-400 fill-base-300 mx-1.5"
          />
        </div>
      ) : (
        <>
          <div className="flex items-center pb-4">
            <p className="ml-2 flex-1 ">
              {currentPicker === PICKER_LEVELS[2] && (
                <Button
                  type="button"
                  variant="minimal"
                  colors="white"
                  wrapperClassName="text-base font-semibold leading-6 mr-2 outline-none"
                  onClick={() => setCurrentPicker(PICKER_LEVELS[1])}
                >
                  {MONTHS_DATA[selectedMonth].name}
                </Button>
              )}
              <Button
                onClick={() => setCurrentPicker(PICKER_LEVELS[0])}
                type="button"
                variant="minimal"
                colors="white"
                wrapperClassName={twClassNames(
                  'text-base font-semibold leading-6 outline-none ',
                  {
                    'bg-base-100 px-1 -mx-1': currentPicker === PICKER_LEVELS[0]
                  }
                )}
              >
                {selectedYear}
              </Button>
            </p>

            {/* year picker carousel button */}
            {currentPicker === PICKER_LEVELS[0] && (
              <>
                <YearPickerButton
                  onClick={jumpToPreviousYear}
                  disableChevron={
                    years.currentPage === 1 ||
                    Math.ceil(years.currentPage) ===
                      Math.ceil(minValue?.year / 12 + 1)
                  }
                  {...prevButtonProps}
                >
                  <ChevronLeftIcon
                    className={twClassNames('text-base-700 h-6 w-6', {
                      'text-base-400':
                        years.currentPage === 1 ||
                        years.currentData()[0] <= minValue?.year,
                      'hover:text-base-500': !(
                        years.currentPage === 1 ||
                        years.currentData()[0] <= minValue?.year
                      )
                    })}
                  />
                </YearPickerButton>
                <YearPickerButton
                  onClick={jumpToNextYear}
                  disableChevron={
                    years.maxPage === years.currentPage ||
                    Math.ceil(years.currentPage) ===
                      Math.ceil(maxValue?.year / 12 + 1)
                  }
                  {...nextButtonProps}
                >
                  <ChevronRightIcon
                    className={twClassNames('text-base-700 h-6 w-6', {
                      'text-base-400':
                        years.maxPage === years.currentPage ||
                        years.currentData()[11] >= maxValue?.year,
                      'hover:text-base-500': !(
                        years.maxPage === years.currentPage ||
                        years.currentData()[11] >= maxValue?.year
                      )
                    })}
                  />
                </YearPickerButton>
              </>
            )}

            {/* month picker carousel button */}
            {currentPicker === PICKER_LEVELS[1] && (
              <>
                <YearPickerButton disableChevron {...prevButtonProps}>
                  <ChevronLeftIcon
                    aria-hidden="true"
                    className={twClassNames('text-base-400 h-6 w-6')}
                  />
                </YearPickerButton>
                <YearPickerButton disableChevron {...nextButtonProps}>
                  <ChevronRightIcon
                    className={twClassNames('text-base-400 h-6 w-6')}
                  />
                </YearPickerButton>
              </>
            )}

            {currentPicker === PICKER_LEVELS[2] && (
              <>
                <CalendarButton
                  onClick={updateTitleOnChevronClick}
                  disableChevron={state.isPreviousVisibleRangeInvalid()}
                  {...prevButtonProps}
                >
                  <ChevronLeftIcon
                    className={twClassNames('text-base-700 h-6 w-6', {
                      'text-base-400': state.isPreviousVisibleRangeInvalid(),
                      'hover:text-base-500':
                        !state.isPreviousVisibleRangeInvalid()
                    })}
                  />
                </CalendarButton>
                <CalendarButton
                  onClick={updateTitleOnChevronClick}
                  disableChevron={state.isNextVisibleRangeInvalid()}
                  {...nextButtonProps}
                >
                  <ChevronRightIcon
                    className={twClassNames('text-base-700 h-6 w-6', {
                      'text-base-400': state.isNextVisibleRangeInvalid(),
                      'hover:text-base-500': !state.isNextVisibleRangeInvalid()
                    })}
                  />
                </CalendarButton>
              </>
            )}
          </div>

          {/* year picker */}
          {currentPicker === PICKER_LEVELS[0] && (
            <YearGrid
              years={years.currentData()}
              minYear={minValue?.year}
              maxYear={maxValue?.year}
            />
          )}
          {currentPicker === PICKER_LEVELS[1] && (
            <MonthGrid
              minMonth={minValue?.month}
              maxMonth={maxValue?.month}
              minYear={minValue?.year}
              maxYear={maxValue?.year}
            />
          )}
          {currentPicker === PICKER_LEVELS[2] && <CalendarGrid state={state} />}
        </>
      )}
    </div>
  );
}

RangeCalendar.propTypes = {
  minValue: Proptype.shape({
    day: Proptype.number,
    era: Proptype.string,
    month: Proptype.number,
    year: Proptype.number
  }).isRequired,
  maxValue: Proptype.shape({
    day: Proptype.number,
    era: Proptype.string,
    month: Proptype.number,
    year: Proptype.number
  }).isRequired,
  isLoading: Proptype.bool
};

RangeCalendar.defaultProps = {
  isLoading: false
};
