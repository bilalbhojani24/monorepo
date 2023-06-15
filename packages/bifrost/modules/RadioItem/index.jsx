import React, { useContext, useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { RadioGroupContextData } from '../../shared/radioGroupContext';

const RadioItem = ({
  option,
  disabled,
  wrapperClassName,
  rightAligned,
  withDescription,
  inlineDescription,
  ...props
}) => {
  const { value, label, description } = option;
  const { activeOption } = useContext(RadioGroupContextData);
  const checked = useMemo(() => activeOption === value, [activeOption, value]);
  return (
    <div
      className={twClassNames(
        'inline-flex item-center',
        {
          'cursor-not-allowed': disabled
        },
        wrapperClassName
      )}
    >
      <RadioGroupPrimitive.Item
        className={twClassNames(
          'mt-0.5 h-4 w-4 shrink-0 rounded-full border bg-white border-base-300 flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
          {
            'order-last mx-3': rightAligned,
            'bg-base-50 cursor-not-allowed': disabled,
            'bg-brand-600 border-transparent': checked,
            'bg-brand-200': checked && disabled
          }
        )}
        value={value}
        disabled={disabled}
        id={value}
        aria-label={`radio with value ${value}`}
        {...props}
      >
        <span
          className={twClassNames('h-1.5 w-1.5 rounded-full bg-white', {
            'bg-base-50': !checked && disabled
          })}
        />
      </RadioGroupPrimitive.Item>

      <div
        className={twClassNames('flex ml-3 text-sm gap-1', {
          'flex-col': !inlineDescription,
          'flex-1': rightAligned,
          'opacity-25 cursor-not-allowed': disabled
        })}
        aria-disabled={disabled}
      >
        {label && (
          <label
            htmlFor={value}
            className={twClassNames('font-medium text-base-900')}
          >
            {label}
          </label>
        )}
        {withDescription && description && (
          <p
            id={`${value}-description`}
            className={twClassNames('text-base-500')}
          >
            {description}
          </p>
        )}
      </div>
    </div>
  );
};

RadioItem.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string
  }).isRequired,
  disabled: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  rightAligned: PropTypes.bool,
  withDescription: PropTypes.bool,
  inlineDescription: PropTypes.bool
};
RadioItem.defaultProps = {
  disabled: false,
  wrapperClassName: '',
  rightAligned: false,
  withDescription: false,
  inlineDescription: false
};

export default RadioItem;
