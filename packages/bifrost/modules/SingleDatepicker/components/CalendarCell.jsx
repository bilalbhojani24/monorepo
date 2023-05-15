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

  if (state.highlightedRange) {
    isSelectionStart = isSameDay(date, state.highlightedRange.start);
    isSelectionEnd = isSameDay(date, state.highlightedRange.end);
  }

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <td
      {...cellProps}
      className={`relative ${isFocusVisible ? 'z-50' : 'z-0'}`}
    >
      <div
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={twClassNames(
          'group h-12 w-12 outline-none mx-auto w-full font-normal',
          {
            disabled: isDisabled,
            'border-y-4 border-white font-semibold': isSelected,
            'bg-danger-300': isSelected && isInvalid
          }
        )}
      >
        <div
          className={twClassNames(
            'flex h-full w-full items-center justify-center cursor-default text-base-900 text-sm leading-5',
            {
              'text-base-300 cursor-not-allowed': isDisabled && !isInvalid,

              // Focus ring, visible while the cell has keyboard focus.
              'group-focus:z-50 ring-brand-600 ring-2 ring-offset-2':
                isFocusVisible,

              // Current date styles
              'text-brand-600': currentDate,

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
