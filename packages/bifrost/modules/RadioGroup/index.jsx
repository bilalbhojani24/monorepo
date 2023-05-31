import React, { createContext, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '../Icon';

import { DIRECTIONS, TYPES } from './const/radioItemConstants';

export const ActiveContext = createContext(undefined);

const RadioGroup = ({
  children,
  value,
  defaultValue,
  onChange,
  required,
  error,
  label,
  description,
  id,
  columnWrapperClassName,
  wrapperClassName,
  direction,
  type
}) => {
  const [activeOption, setActiveOption] = useState(
    value || defaultValue || undefined
  );
  return (
    <div className={wrapperClassName}>
      {label && (
        <label
          htmlFor={id}
          id={`${id}label-wrap`}
          className={twClassNames('text-base-700 block text-sm font-medium', {
            'mb-2': !description.length
          })}
        >
          {label}
          {required && <span className="text-danger-600 ml-0.5">*</span>}
        </label>
      )}
      {description && (
        <p className={twClassNames('text-sm text-base-500 mb-2')}>
          {description}
        </p>
      )}
      <RadioGroupPrimitive.Root
        id={id}
        name={id}
        value={value ?? undefined}
        defaultValue={defaultValue ?? undefined}
        onValueChange={(option) => {
          setActiveOption(option);
          if (onChange) onChange(option);
        }}
        required={required}
        aria-label="radio-group"
        className={twClassNames(
          {
            'space-y-4 md:flex md:items-center md:space-x-10 md:space-y-0':
              type === TYPES[0] && direction === DIRECTIONS[0],
            'flex space-y-5 flex-col':
              type === TYPES[0] && direction === DIRECTIONS[1],
            'grid grid-cols-3 gap-3 sm:grid-cols-6': type === TYPES[1],
            'grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4':
              type === TYPES[2] && direction === DIRECTIONS[0],
            'space-y-4': type === TYPES[2] && direction === DIRECTIONS[1],
            'relative -space-y-px rounded-md bg-white': type === TYPES[3]
          },
          columnWrapperClassName
        )}
      >
        <ActiveContext.Provider value={activeOption}>
          {children}
        </ActiveContext.Provider>
      </RadioGroupPrimitive.Root>
      {error && (
        <div className="mt-2 flex items-center gap-1 pr-3">
          <ExclamationCircleIcon
            className="text-danger-500 h-5 w-5"
            aria-hidden="true"
          />

          <p className="text-danger-600 text-sm" id={`${id}error-wrap`}>
            {error}
          </p>
        </div>
      )}
    </div>
  );
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  value: PropTypes.oneOfType(['string', 'number']),
  defaultValue: PropTypes.oneOfType(['string', 'number']),
  onChange: PropTypes.func,
  required: PropTypes.bool,
  error: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string,
  columnWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  direction: PropTypes.oneOf(DIRECTIONS),
  type: PropTypes.oneOf(TYPES)
};
RadioGroup.defaultProps = {
  children: null,
  value: '',
  defaultValue: '',
  onChange: null,
  required: false,
  error: '',
  label: '',
  id: '',
  description: '',
  columnWrapperClassName: '',
  wrapperClassName: '',
  direction: DIRECTIONS[0],
  type: TYPES[0]
};

export default RadioGroup;
