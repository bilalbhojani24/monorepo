import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { ActiveContext } from '../RadioGroup';

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
    type === 'smallCard'
      ? [
          'focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
          disabled
            ? 'opacity-25 cursor-not-allowed'
            : 'cursor-pointer focus:outline-none',
          checked
            ? 'bg-brand-600 border-transparent text-white hover:bg-brand-700'
            : 'bg-white border-base-200 text-base-900 hover:bg-base-50',
          'border rounded-md py-3 px-3 flex items-center justify-center text-sm font-medium uppercase sm:flex-1'
        ]
      : [
          'w-full border-base-300 relative cursor-pointer rounded-lg border bg-white p-4 shadow-sm  text-left',
          disabled
            ? 'opacity-25 cursor-not-allowed'
            : 'cursor-pointer focus:outline-none',
          direction === 'horizontal'
            ? 'flex border p-4'
            : 'block border px-6 py-4 sm:flex sm:justify-between'
        ];
  return (
    <RadioGroupPrimitive.Item
      className={twClassNames([...cardStyles], wrapperClassName)}
      value={value}
      disabled={disabled}
      {...props}
    >
      {type === 'smallCard' && label && <label htmlFor={value}>{label}</label>}

      {type === 'stackedCard' && (
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
                    hidden: direction === 'vertical'
                  }
                )}
              >
                {text}
              </span>
            </span>
          </span>
          <span
            className={twClassNames('text-sm font-medium text-base-900', {
              hidden: direction === 'horizontal'
            })}
          >
            {text}
          </span>
          {direction === 'horizontal' ? (
            <CheckCircleIcon
              className={twClassNames(
                !checked ? 'invisible' : '',
                'h-5 w-5 text-brand-600'
              )}
              aria-hidden="true"
            />
          ) : null}
          <span
            className={twClassNames(
              'pointer-events-none absolute -inset-px rounded-lg border-2 focus:border',
              checked ? 'border-brand-500' : 'border-transparent'
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
  direction: PropTypes.oneOf(['horizontal', 'vertical']),
  type: PropTypes.string,
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
RadioCard.defaultProps = {
  disabled: false,
  direction: 'horizontal',
  type: 'smallCard',
  wrapperClassName: ''
};

export default RadioCard;
