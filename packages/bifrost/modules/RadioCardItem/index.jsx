import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { ActiveContext } from '../RadioGroup';
import { DIRECTIONS, TYPES } from '../RadioGroup/const/radioItemConstants';

const RadioCard = ({
  option,
  disabled,
  wrapperClassName,
  type,
  direction,
  ...props
}) => {
  const { value, label, text, description } = option;
  const active = useContext(ActiveContext);
  const checked = active === value;
  const cardStyles =
    type === TYPES[1]
      ? [
          'border-base-200 text-base-900 rounded-md p-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1 hover:bg-base-50 focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
          checked &&
            'bg-brand-600 border-transparent text-white hover:bg-brand-700'
        ]
      : [
          'w-full border-base-300 relative rounded-lg  p-4 shadow-sm  text-left',
          direction === DIRECTIONS[0]
            ? 'flex p-4'
            : 'block px-6 py-4 sm:flex sm:justify-between'
        ];
  return (
    <RadioGroupPrimitive.Item
      className={twClassNames(
        'cursor-pointer focus:outline-none bg-white border',
        [...cardStyles],
        { 'opacity-25 cursor-not-allowed': disabled },
        wrapperClassName
      )}
      value={value}
      disabled={disabled}
      {...props}
    >
      {type === TYPES[1] && label && <label htmlFor={value}>{label}</label>}

      {type === TYPES[2] && (
        <>
          <span className={twClassNames('flex flex-1')}>
            <span className="flex flex-col items-baseline">
              <span className="text-base-900 block text-sm font-medium">
                {label}
              </span>
              <span className="text-base-500 mt-1 flex items-center text-sm">
                {description}
              </span>
              <span
                className={twClassNames(
                  'mt-6 text-sm font-medium text-base-900',
                  {
                    hidden: direction === DIRECTIONS[1]
                  }
                )}
              >
                {text}
              </span>
            </span>
          </span>
          <span
            className={twClassNames('text-sm font-medium text-base-900', {
              hidden: direction === DIRECTIONS[0]
            })}
          >
            {text}
          </span>
          {direction === DIRECTIONS[0] ? (
            <CheckCircleIcon
              className={twClassNames(
                { invisible: !checked },
                'h-5 w-5 text-brand-600'
              )}
              aria-hidden="true"
            />
          ) : null}
          <span
            className={twClassNames(
              'pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent focus:border',
              { 'border-brand-500': checked }
            )}
            aria-hidden="true"
          />
        </>
      )}
    </RadioGroupPrimitive.Item>
  );
};

RadioCard.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType(['string', 'number']).isRequired,
    label: PropTypes.string.isRequired,
    text: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  direction: PropTypes.oneOf(DIRECTIONS),
  type: PropTypes.oneOf(TYPES),
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
RadioCard.defaultProps = {
  disabled: false,
  direction: DIRECTIONS[0],
  type: TYPES[1],
  wrapperClassName: ''
};

export default RadioCard;
