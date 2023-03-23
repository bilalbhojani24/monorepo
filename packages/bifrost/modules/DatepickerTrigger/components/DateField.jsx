import React, { useRef } from 'react';
import { useDateField, useDateSegment, useLocale } from 'react-aria';
import { useDateFieldState } from 'react-stately';
import { createCalendar } from '@internationalized/date';
import PropTypes from 'prop-types';

export function DateField(props) {
  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar
  });

  const ref = useRef();
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="flex">
      {state.segments.map((segment, i) => (
        <DateSegment key={`${i + 1}`} segment={segment} state={state} />
      ))}
    </div>
  );
}

function DateSegment({ segment, state }) {
  const ref = useRef();
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      style={{
        ...segmentProps.style,
        minWidth:
          segment.maxValue != null && `${String(segment.maxValue).length}ch`
      }}
      className={`focus:bg-brand-600 group box-content rounded-sm px-0.5 text-right tabular-nums outline-none focus:text-white ${
        !segment.isEditable ? 'text-base-500' : 'text-base-800'
      }`}
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      <span
        aria-hidden="true"
        className="text-base-500 block w-full text-center italic group-focus:text-white"
        style={{
          visibility: segment.isPlaceholder ? '' : 'hidden',
          height: segment.isPlaceholder ? '' : 0,
          pointerEvents: 'none'
        }}
      >
        {segment.placeholder}
      </span>
      {segment.isPlaceholder ? '' : segment.text}
    </div>
  );
}

DateSegment.propTypes = {
  segment: PropTypes.shape({
    maxValue: PropTypes.number,
    isEditable: PropTypes.bool,
    isPlaceholder: PropTypes.bool,
    placeholder: PropTypes.string,
    text: PropTypes.string
  }),
  state: PropTypes.shape({})
};

DateSegment.defaultProps = {
  segment: {},
  state: {}
};
