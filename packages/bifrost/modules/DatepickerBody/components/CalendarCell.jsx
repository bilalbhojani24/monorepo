import React, { useRef } from 'react';
import {
  mergeProps,
  useCalendarCell,
  useFocusRing,
  useLocale
} from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import { getDayOfWeek, isSameDay } from '@internationalized/date';
import Proptypes from 'prop-types';

export function CalendarCell({ state, date }) {
  const ref = useRef();
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid
  } = useCalendarCell({ date }, state, ref);

  let isSelectionStart = isSelected;
  let isSelectionEnd = isSelected;

  if (state.highlightedRange) {
    isSelectionStart = isSameDay(date, state.highlightedRange.start);
    isSelectionEnd = isSameDay(date, state.highlightedRange.end);
  }

  const { locale } = useLocale();
  const dayOfWeek = getDayOfWeek(date, locale);
  const isRoundedLeft =
    isSelected && (isSelectionStart || dayOfWeek === 0 || date.day === 1);
  const isRoundedRight =
    isSelected &&
    (isSelectionEnd ||
      dayOfWeek === 6 ||
      date.day === date.calendar.getDaysInMonth(date));

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={twClassNames('relative py-0.5', {
        'z-10': isFocusVisible,
        'z-0': !isFocusVisible
      })}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={twClassNames('group h-10 w-10 outline-none', {
          disabled: isDisabled,
          'rounded-l-full': isRoundedLeft,
          'rounded-r-full': isRoundedRight,
          'bg-brand-300': isSelected,
          'bg-danger-300': isSelected && isInvalid
        })}
      >
        <div
          className={twClassNames(
            'flex h-full w-full items-center justify-center rounded-full cursor-default',
            {
              'text-base-400': isDisabled && !isInvalid,

              // Focus ring, visible while the cell has keyboard focus.
              'group-focus:z-2 ring-brand-600 ring-2 ring-offset-2':
                isFocusVisible,

              // Darker selection background for the start and end.
              'bg-brand-600 hover:bg-brand-700 text-white':
                isSelectionStart || isSelectionEnd,
              'bg-danger-600 hover:bg-danger-700 text-white':
                (isSelectionStart || isSelectionEnd) && isInvalid,

              // Hover state for cells in the middle of the range.
              'hover:bg-danger-400':
                isSelected &&
                !isDisabled &&
                !(isSelectionStart || isSelectionEnd) &&
                isInvalid,
              'hover:bg-brand-400':
                isSelected &&
                !isDisabled &&
                !(isSelectionStart || isSelectionEnd) &&
                !isInvalid,

              // Hover state for non-selected cells.
              'hover:bg-brand-100': !isSelected && !isDisabled
            }
          )}
        >
          {formattedDate}
        </div>
      </div>
    </td>
  );
}

CalendarCell.propTypes = {
  state: Proptypes.shape({
    highlightedRange: Proptypes.shape({
      start: Proptypes.string,
      end: Proptypes.string
    })
  }),
  date: Proptypes.shape({
    day: Proptypes.string,
    calendar: Proptypes.shape({
      getDaysInMonth: Proptypes.func
    })
  })
};

CalendarCell.defaultProps = {
  state: {},
  date: {}
};
