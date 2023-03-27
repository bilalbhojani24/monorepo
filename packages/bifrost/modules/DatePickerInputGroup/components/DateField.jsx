import React, { useRef } from 'react';
import { useDateField, useDateSegment } from 'react-aria';
import { useDateFieldState } from 'react-stately';
import { twClassNames } from '@browserstack/utils';
import { createCalendar } from '@internationalized/date';
import PropTypes from 'prop-types';

export function DateField(props) {
  const state = useDateFieldState({
    ...props,
    locale: 'en-US',
    createCalendar
  });

  const { disabled, errorMessage } = props;

  const ref = useRef();
  const { fieldProps } = useDateField(props, state, ref);
  return (
    <div
      {...fieldProps}
      ref={ref}
      className="flex w-full items-center gap-1"
      aria-label="Enter valid date"
    >
      {disabled ? (
        <p className="text-base-400 text-sm font-normal leading-5">
          00-00-0000
        </p>
      ) : (
        state.segments.map((segment, i) => (
          <DateSegment
            key={`${i + 1}`}
            segment={segment}
            state={state}
            errorState={!!errorMessage}
          />
        ))
      )}
    </div>
  );
}

DateField.propTypes = {
  disabled: PropTypes.bool,
  errorMessage: PropTypes.string
};

DateField.defaultProps = {
  disabled: false,
  errorMessage: ''
};

function DateSegment({ segment, state, errorState }) {
  const ref = useRef();
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className="focus:bg-brand-200 group w-fit rounded-sm uppercase outline-none focus:text-white"
    >
      {/* Always reserve space for the placeholder, to prevent layout shift when editing. */}
      {segment.isPlaceholder ? (
        <span
          aria-hidden="true"
          className="text-base-500 pointer-events-none block w-full text-sm font-normal leading-5"
        >
          {segment.placeholder}
        </span>
      ) : (
        <span
          className={twClassNames(
            'text-base-900 m-0 block w-fit text-sm font-normal leading-5',
            {
              'text-base-500': segment.text === '/',
              'text-danger-600': errorState && segment.text !== '/'
            }
          )}
        >
          {segment.text.replace(/(^|\D)(\d)(?!\d)/g, '$10$2')}
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
  state: PropTypes.shape({}),
  errorState: PropTypes.bool
};

DateSegment.defaultProps = {
  segment: {},
  state: {},
  errorState: false
};
