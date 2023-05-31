import React, { useContext } from 'react';
import { twClassNames } from '@browserstack/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { ActiveContext } from '../RadioGroup';

const RadioTable = ({
  option,
  disabled,
  index,
  length,
  singleColumn,
  inlineDescription,
  wrapperClassName,
  ...props
}) => {
  const { value, label, description, columns } = option;
  const active = useContext(ActiveContext);
  const checked = active === value;
  return (
    <RadioGroupPrimitive.Item
      className={twClassNames(
        'w-full relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 focus:outline-none',
        {
          'rounded-tl-md rounded-tr-md': index === 0,
          'rounded-bl-md rounded-br-md': index === length - 1,
          'bg-brand-50 border-brand-200 z-10': checked,
          'border-base-200': !checked,
          'md:grid md:grid-cols-4': !singleColumn,
          'cursor-not-allowed': disabled
        },
        wrapperClassName
      )}
      value={value}
      disabled={disabled}
      {...props}
    >
      <span
        className={twClassNames('flex items-center text-sm', {
          'opacity-25': disabled
        })}
      >
        <span
          className={twClassNames(
            {
              'bg-brand-600 border-transparent': checked,
              'bg-white border-base-300': !checked
            },
            'h-4 w-4 shrink-0 rounded-full border flex items-center justify-center focus:ring-2 focus:ring-offset-2 focus:ring-brand-500'
          )}
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
        </span>

        <div
          className={twClassNames('flex text-left', {
            'flex-col items-baseline': !inlineDescription
          })}
        >
          <span
            className={twClassNames(
              {
                'text-brand-900': checked,
                'text-base-900': !checked
              },
              'ml-3 block text-sm font-medium'
            )}
          >
            {label}
          </span>
          <span
            className={twClassNames(
              checked ? 'text-brand-700' : 'text-base-500',
              'block text-sm ml-3'
            )}
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
                className={twClassNames(
                  {
                    'text-brand-900': checked,
                    'text-base-900': !checked
                  },
                  'font-medium'
                )}
              >
                {column.label}
              </span>
            )}
            {column.description && (
              <span
                className={twClassNames({
                  'text-brand-700': checked,
                  'text-base-500': !checked
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

RadioTable.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType(['string', 'number']).isRequired,
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
  index: PropTypes.number,
  length: PropTypes.number,
  inlineDescription: PropTypes.bool,
  wrapperClassName: PropTypes.string
};
RadioTable.defaultProps = {
  disabled: false,
  singleColumn: false,
  index: 0,
  length: 0,
  inlineDescription: true,
  wrapperClassName: ''
};

export default RadioTable;
