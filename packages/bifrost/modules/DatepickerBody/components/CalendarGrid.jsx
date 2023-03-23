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
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th
              className="text-base-500 h-10 w-14 text-center text-sm font-normal leading-5"
              key={`${day}-${index + 1}`}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth + 1).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell
                    key={`${date}-${i + 1}`}
                    state={state}
                    date={date}
                    borderRadiusTopLeft={weekIndex === 0 && i === 0}
                    borderRadiusBottomLeft={
                      weekIndex === weeksInMonth && i === 0
                    }
                    borderRadiusTopRight={weekIndex === 0 && i === 6}
                    borderRadiusBottomRight={
                      weekIndex === weeksInMonth && i === 6
                    }
                    borderTop={weekIndex === 0}
                    borderLeft={i === 0}
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
