import React, { useContext, useMemo } from 'react';
import { twClassNames } from '@browserstack/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { RadioGroupContextData } from '../../shared/radioGroupContext';
import { RadioTableBorderStyles } from '../RadioGroup/const/radioConstantStyles';

const RadioTableItem = ({
  option,
  disabled,
  borderType,
  singleColumn,
  inlineDescription,
  wrapperClassName,
  ...props
}) => {
  const { value, label, description, columns } = option;
  const { activeOption } = useContext(RadioGroupContextData);
  const checked = useMemo(() => activeOption === value, [activeOption, value]);

  return (
    <RadioGroupPrimitive.Item
      className={twClassNames(
        'w-full relative border border-base-200 p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none',
        RadioTableBorderStyles[borderType],
        {
          'bg-brand-50 border-brand-200 z-10': checked,
          'md:grid md:grid-cols-4': !singleColumn,
          'cursor-not-allowed': disabled
        },
        wrapperClassName
      )}
      value={value}
      disabled={disabled}
      {...props}
    >
      <span className={twClassNames('flex text-sm')}>
        <span
          className={twClassNames(
            'mt-0.5 h-4 w-4 shrink-0 rounded-full border bg-white border-base-300 flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500',
            {
              'bg-brand-600 border-transparent': checked,
              'bg-base-50': disabled,
              'bg-brand-200': checked && disabled
            }
          )}
          aria-hidden="true"
        >
          <span
            className={twClassNames('h-1.5 w-1.5 rounded-full bg-white', {
              'bg-base-50': !checked && disabled
            })}
          />
        </span>

        <div
          className={twClassNames('flex text-left', {
            'flex-col items-baseline': !inlineDescription,
            'opacity-25': disabled
          })}
        >
          <span
            className={twClassNames(
              'ml-3 block text-sm font-medium text-base-900',
              {
                'text-brand-900': checked
              }
            )}
          >
            {label}
          </span>
          <span
            className={twClassNames('block text-sm ml-3 text-base-500', {
              'text-brand-700': checked
            })}
          >
            {description}
          </span>
        </div>
      </span>
      {!singleColumn &&
        columns.map((column, i) => (
          <span
            className={twClassNames(
              'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center sm:text-left',
              { 'md:text-right': i === columns.length - 1 },
              { 'opacity-25': disabled }
            )}
          >
            {column.label && (
              <span
                className={twClassNames('font-medium text-base-900', {
                  'text-brand-900': checked
                })}
              >
                {column.label}
              </span>
            )}
            {column.description && (
              <span
                className={twClassNames('text-base-500', {
                  'text-brand-700': checked
                })}
              >
                {column.description}
              </span>
            )}
          </span>
        ))}
    </RadioGroupPrimitive.Item>
  );
};

RadioTableItem.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    label: PropTypes.string.isRequired,
    description: PropTypes.string,
    columns: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        description: PropTypes.string
      })
    )
  }).isRequired,
  disabled: PropTypes.bool,
  singleColumn: PropTypes.bool,
  borderType: PropTypes.string,
  inlineDescription: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
RadioTableItem.defaultProps = {
  disabled: false,
  singleColumn: false,
  borderType: '',
  inlineDescription: true,
  wrapperClassName: ''
};

export default RadioTableItem;
