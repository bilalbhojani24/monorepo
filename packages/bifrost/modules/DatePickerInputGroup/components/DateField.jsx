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

  const { disabled } = props;

  const ref = useRef();
  const { fieldProps } = useDateField(props, state, ref);

  return (
    <div {...fieldProps} ref={ref} className="flex w-full items-center">
      {disabled ? (
        <p className="text-base-500 text-sm font-normal leading-5">
          00-00-0000
        </p>
      ) : (
        state.segments.map((segment, i) => (
          <DateSegment key={`${i + 1}`} segment={segment} state={state} />
        ))
      )}
    </div>
  );
}

DateField.propTypes = {
  disabled: PropTypes.bool
};

DateField.defaultProps = {
  disabled: false
};

function DateSegment({ segment, state }) {
  const ref = useRef();
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className="focus:bg-brand-200 group w-fit rounded-sm outline-none focus:text-white"
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      {segment.isPlaceholder ? (
        <span
          aria-hidden="true"
          className="text-base-900 pointer-events-none block w-full text-sm font-normal leading-5"
        >
          {segment.placeholder}
        </span>
      ) : (
        <span className="text-base-900 m-0 block w-fit text-sm font-normal leading-5">
          {segment.text}
        </span>
      )}
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
