import React from 'react';
import { useCalendarGrid, useLocale } from 'react-aria';
import { CalendarDate, getWeeksInMonth } from '@internationalized/date';
import Proptypes from 'prop-types';

import { CalendarCell } from './CalendarCell';

export function CalendarGrid({ state, ...props }) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps} cellPadding="0" className="flex-1">
      <thead {...headerProps} className="text-base-600">
        <tr>
          {weekDays.map((day, index) => (
            <th className="text-center" key={`${day}-${index + 1}`}>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={`${date}-${i + 1}`}
                    state={state}
                    date={date}
                  />
                ) : (
                  <td key={`${date}-${i + 1}`} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

CalendarGrid.propTypes = {
  state: Proptypes.shape({
    visibleRange: Proptypes.shape({
      start: Proptypes.instanceOf(CalendarDate)
    }),
    getDatesInWeek: Proptypes.func
  }).isRequired
};
