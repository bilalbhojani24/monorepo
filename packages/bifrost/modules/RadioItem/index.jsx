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
  inlineDescription,
  ...props
}) => {
  const { value, label, description } = option;
  const { activeOption } = useContext(RadioGroupContextData);
  const checked = useMemo(() => activeOption === value, [activeOption, value]);
  return (
    <div
      className={twClassNames(
        'inline-flex item-center mr-3',
        {
          'cursor-not-allowed': disabled
        },
        wrapperClassName
      )}
    >
      <RadioGroupPrimitive.Item
        className={twClassNames(
          'h-4 w-4 shrink-0 rounded-full border bg-white border-base-300 flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
          {
            'order-last mx-3': rightAligned,
            'cursor-not-allowed': disabled,
            'bg-brand-600 border-transparent': checked
          }
        )}
        value={value}
        disabled={disabled}
        id={value}
        {...props}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
      </RadioGroupPrimitive.Item>

      <div
        className={twClassNames('flex ml-3 text-sm', {
          'flex-col': !inlineDescription,
          'flex-1': rightAligned
        })}
      >
        {label && (
          <label
            htmlFor={value}
            className={twClassNames('font-medium text-base-700', {
              'text-base-400 cursor-not-allowed': disabled
            })}
          >
            {label}
          </label>
        )}
        {description && (
          <p
            id={`${value}-description`}
            className={twClassNames('text-base-500', {
              'text-base-300 cursor-not-allowed': disabled
            })}
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
  inlineDescription: PropTypes.bool
};
RadioItem.defaultProps = {
  disabled: false,
  wrapperClassName: '',
  rightAligned: false,
  inlineDescription: false
};

export default RadioItem;
