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

export function CalendarCell({
  state,
  date,
  // borderRadiusTopLeft,
  // borderRadiusBottomLeft,
  // borderRadiusTopRight,
  // borderRadiusBottomRight,
  borderTop,
  borderLeft,
  currentDate
}) {
  const ref = useRef();
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
    isInvalid,
    isUnavailable
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
      className={twClassNames('relative', {
        'z-10': isFocusVisible,
        'z-0': !isFocusVisible
      })}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={twClassNames('group h-10 w-10 outline-none', {
          disabled: isDisabled,
          'rounded-l-full': isRoundedLeft,
          'rounded-r-full': isRoundedRight
          // selected state
          // 'bg-brand-300': isSelected,
          // 'bg-danger-300': isSelected && isInvalid
        })}
      >
        <div
          className={twClassNames(
            'border-base-300 h-10 w-14 border-b border-r flex flex-col justify-around',
            {
              // 'rounded-tl-2xl': borderRadiusTopLeft,
              // 'rounded-bl-2xl': borderRadiusBottomLeft,
              // 'rounded-tr-2xl': borderRadiusTopRight,
              // 'rounded-br-2xl': borderRadiusBottomRight,

              'border-t': borderTop,
              'border-l': borderLeft
            }
          )}
        >
          <div
            className={twClassNames(
              'flex h-full w-full items-center justify-center bg-white cursor-pointer',
              {
                // border radius for the edge cells
                // 'rounded-tl-2xl': borderRadiusTopLeft,
                // 'rounded-bl-2xl': borderRadiusBottomLeft,
                // 'rounded-tr-2xl': borderRadiusTopRight,
                // 'rounded-br-2xl': borderRadiusBottomRight,

                'text-base-400': isDisabled && !isInvalid,

                // Focus ring, visible while the cell has keyboard focus.
                'group-focus:z-2 ring-brand-600 ring-2 ring-offset-2':
                  isFocusVisible,

                // dates outside of current month
                'bg-base-100 cursor-not-allowed text-base-900':
                  isOutsideVisibleRange,

                // current date
                'text-brand-600 hover:bg-brand-50 hover:text-brand-800 rounded-full font-semibold w-7 h-7 mx-auto rounded-full':
                  currentDate,
                // Darker selection background for the start and end.
                // selected state for picking single date
                'bg-base-900 text-white rounded-full font-semibold w-7 h-7 mx-auto rounded-full':
                  isSelectionStart || isSelectionEnd,
                'bg-danger-600 hover:bg-danger-700 text-white font-semibold w-7 h-7 mx-auto rounded-full':
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
                'hover:bg-base-100 w-7 h-7 mx-auto rounded-full':
                  !isSelected && !isDisabled,

                // styles for unavailable dates
                'bg-base-100 w-full h-full rounded-none':
                  isOutsideVisibleRange && currentDate,

                '': isUnavailable
              }
            )}
          >
            {formattedDate}
          </div>
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
  }),
  borderRadiusTopLeft: Proptypes.bool,
  borderRadiusBottomLeft: Proptypes.bool,
  borderRadiusTopRight: Proptypes.bool,
  borderRadiusBottomRight: Proptypes.bool,
  borderTop: Proptypes.bool,
  borderLeft: Proptypes.bool,
  currentDate: Proptypes.bool
};

CalendarCell.defaultProps = {
  state: {},
  date: {},
  borderRadiusTopLeft: false,
  borderRadiusBottomLeft: false,
  borderRadiusTopRight: false,
  borderRadiusBottomRight: false,
  borderTop: false,
  borderLeft: false,
  currentDate: false
};
