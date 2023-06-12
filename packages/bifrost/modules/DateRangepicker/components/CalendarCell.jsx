import React, { useRef } from 'react';
import { mergeProps, useCalendarCell, useFocusRing } from 'react-aria';
import { twClassNames } from '@browserstack/utils';
import { isSameDay } from '@internationalized/date';
import Proptypes from 'prop-types';

export function CalendarCell({ state, date, currentDate }) {
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
  let singleDateRange = false;

  if (state.highlightedRange) {
    isSelectionStart = isSameDay(date, state.highlightedRange.start);
    isSelectionEnd = isSameDay(date, state.highlightedRange.end);
    singleDateRange = isSameDay(
      state.highlightedRange.start,
      state.highlightedRange.end
    );
  }

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
        className={twClassNames(
          'group h-12 w-12 outline-none mx-auto w-full font-normal',
          {
            disabled: isDisabled,
            'bg-base-200 border-y-4 border-white font-semibold': isSelected,

            // gradient when in selected state
            'rounded-l-full bg-gradient-to-r from-white to-base-200':
              isSelectionStart && !isOutsideVisibleRange && !isInvalid,
            'rounded-r-full bg-gradient-to-r from-base-200 to-white':
              isSelectionEnd && !isOutsideVisibleRange && !isInvalid,

            // gradient when in error state
            'rounded-l-full bg-gradient-to-r from-white to-danger-300':
              isSelectionStart && !isOutsideVisibleRange && isInvalid,
            'rounded-r-full bg-gradient-to-r from-danger-300 to-white':
              isSelectionEnd && !isOutsideVisibleRange && isInvalid,

            'bg-gradient-to-r from-white to-white': singleDateRange,
            'bg-danger-300': isSelected && isInvalid
          }
        )}
      >
        <div
          className={twClassNames(
            'flex h-full w-full items-center justify-center cursor-default text-base-900 text-sm leading-5',
            {
              'cursor-pointer': !isDisabled && !isInvalid,
              'text-base-300 cursor-not-allowed': isDisabled && !isInvalid,

              // Focus ring, visible while the cell has keyboard focus.
              'group-focus:z-2 ring-brand-600 ring-2 ring-offset-2':
                isFocusVisible,

              // Current date styles
              'text-brand-600 font-medium': currentDate,

              // Darker selection background for the start and end.
              'bg-base-900 text-white rounded-full w-5/6 mx-auto':
                (isSelectionStart || isSelectionEnd) && !isOutsideVisibleRange,
              'bg-base-900 hover:bg-danger-700 text-white w-5/6 mx-auto':
                (isSelectionStart || isSelectionEnd) && isInvalid,

              'hover:bg-danger-400 font-semibold':
                isSelected &&
                !isDisabled &&
                !(isSelectionStart || isSelectionEnd) &&
                isInvalid,

              // Hover state for non-selected cells.
              'hover:bg-base-100': !isSelected && !isDisabled,

              // dates outside of current month
              'bg-base-50 cursor-not-allowed text-base-900':
                isOutsideVisibleRange
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
      start: Proptypes.oneOfType([Proptypes.shape({}), Proptypes.string]),
      end: Proptypes.oneOfType([Proptypes.shape({}), Proptypes.string])
    })
  }),
  date: Proptypes.shape({
    day: Proptypes.number,
    calendar: Proptypes.shape({
      getDaysInMonth: Proptypes.func
    })
  }),
  currentDate: Proptypes.bool.isRequired
};

CalendarCell.defaultProps = {
  state: {},
  date: {}
};
