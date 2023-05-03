import React, { useRef } from 'react';
import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { twClassNames } from '@browserstack/utils';
import { createCalendar } from '@internationalized/date';
import Proptype from 'prop-types';

import Button from '../../Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../../Icon';
import Loader from '../../Loader';

import { CalendarButton } from './Button';
import { CalendarGrid } from './CalendarGrid';

export function Calendar(props) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });
  const { isLoading } = props;

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state, ref);

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="text-base-800 m-0 inline-block p-0"
    >
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
          <div className="mb-4 flex items-center justify-between">
            <p className="ml-2 flex-1 ">
              <Button
                type="button"
                variant="minimal"
                colors="white"
                wrapperClassName="text-base font-semibold leading-6 mr-2 outline-none"
              >
                {title.split(' ')[0]}
              </Button>
              <Button
                type="button"
                variant="minimal"
                colors="white"
                wrapperClassName={twClassNames(
                  'text-base font-semibold leading-6 outline-none ',
                  {
                    // 'bg-base-100 px-1 -mx-1': currentPicker === PICKER_LEVELS[0]
                  }
                )}
              >
                {title.split(' ')[1]}
              </Button>
            </p>
            <CalendarButton
              {...prevButtonProps}
              disableChevron={state.isPreviousVisibleRangeInvalid()}
            >
              <ChevronLeftIcon
                className={twClassNames('text-base-700 h-6 w-6', {
                  'text-base-400': state.isPreviousVisibleRangeInvalid(),
                  'hover:text-base-500': !state.isPreviousVisibleRangeInvalid()
                })}
              />
            </CalendarButton>
            <CalendarButton
              {...nextButtonProps}
              disableChevron={state.isNextVisibleRangeInvalid()}
            >
              <ChevronRightIcon className="h-6 w-6" />
            </CalendarButton>
          </div>
          <CalendarGrid state={state} />
        </>
      )}
    </div>
  );
}

Calendar.propTypes = {
  isLoading: Proptype.bool
};

Calendar.defaultProps = {
  isLoading: false
};
