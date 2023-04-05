import React, { useRef } from 'react';
import { useCalendar, useLocale } from 'react-aria';
import { useCalendarState } from 'react-stately';
import { createCalendar } from '@internationalized/date';

import { ChevronLeftIcon, ChevronRightIcon } from '../../Icon';

import { CalendarButton } from './Button';
import { CalendarGrid } from './CalendarGrid';

export function Calendar(props) {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar
  });

  const ref = useRef();
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state, ref);

  return (
    <div
      {...calendarProps}
      ref={ref}
      className="text-base-800 m-0 inline-block p-0"
    >
      <div className="mb-4 flex items-center justify-between">
        <CalendarButton {...prevButtonProps}>
          <ChevronLeftIcon className="h-6 w-6" />
        </CalendarButton>
        <p className="flex-1 text-center text-base font-bold">{title}</p>
        <CalendarButton {...nextButtonProps}>
          <ChevronRightIcon className="h-6 w-6" />
        </CalendarButton>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
