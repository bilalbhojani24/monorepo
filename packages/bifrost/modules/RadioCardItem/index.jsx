import React, { useContext, useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import { CheckCircleIcon } from '@heroicons/react/20/solid';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { RadioGroupContextData } from '../../shared/radioGroupContext';
import { RadioCardStyles } from '../RadioGroup/const/radioConstantStyles';
import { DIRECTIONS, TYPES } from '../RadioGroup/const/radioItemConstants';

const RadioCardItem = ({ option, disabled, wrapperClassName, ...props }) => {
  const { value, primaryLabel, secondaryLabel, description } = option;
  const { activeOption, type, direction } = useContext(RadioGroupContextData);
  const checked = useMemo(() => activeOption === value, [activeOption, value]);

  return (
    <RadioGroupPrimitive.Item
      className={twClassNames(
        'cursor-pointer focus:outline-none bg-white border',
        RadioCardStyles[type][direction],
        {
          'opacity-25 cursor-not-allowed': disabled,
          'bg-brand-600 border-transparent text-white hover:bg-brand-700':
            type === TYPES[1] && checked
        },
        wrapperClassName
      )}
      value={value}
      disabled={disabled}
      {...props}
    >
      {type === TYPES[1] && primaryLabel && (
        <label htmlFor={value}>{primaryLabel}</label>
      )}

      {type === TYPES[2] && (
        <>
          <span className={twClassNames('flex flex-1')}>
            <span className="flex flex-col items-baseline">
              <span className="text-base-900 block text-sm font-medium">
                {primaryLabel}
              </span>
              <span className="text-base-500 flex items-center text-sm">
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
                {secondaryLabel}
              </span>
            </span>
          </span>
          <span
            className={twClassNames('text-sm font-medium text-base-900', {
              hidden: direction === DIRECTIONS[0]
            })}
          >
            {secondaryLabel}
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

RadioCardItem.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    primaryLabel: PropTypes.string.isRequired,
    secondaryLabel: PropTypes.string,
    description: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
RadioCardItem.defaultProps = {
  disabled: false,
  wrapperClassName: ''
};

export default RadioCardItem;
