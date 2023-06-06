import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import PropTypes from 'prop-types';

import { RadioGroupContextData } from '../../shared/radioGroupContext';
import { ExclamationCircleIcon } from '../Icon';

import { RadioWrapperStyles } from './const/radioConstantStyles';
import { DIRECTIONS, TYPES } from './const/radioItemConstants';

const RadioGroup = ({
  children,
  value,
  defaultValue,
  onChange,
  isMandatory,
  errorText,
  label,
  description,
  id,
  columnWrapperClassName,
  wrapperClassName,
  direction,
  type
}) => {
  const [activeOption, setActiveOption] = useState(value || defaultValue);
  return (
    <RadioGroupContextData.Provider value={{ activeOption, type, direction }}>
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
            {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
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
            onChange?.(option);
          }}
          isMandatory={isMandatory}
          aria-label="radio-group"
          className={twClassNames(
            RadioWrapperStyles[type][direction],
            columnWrapperClassName
          )}
        >
          {children}
        </RadioGroupPrimitive.Root>
        {errorText && (
          <div className="flex items-center gap-1 pr-3">
            <ExclamationCircleIcon
              className="text-danger-500 h-5 w-5"
              aria-hidden="true"
            />

            <p className="text-danger-600 text-sm" id={`${id}errorText-wrap`}>
              {errorText}
            </p>
          </div>
        )}
      </div>
    </RadioGroupContextData.Provider>
  );
};

RadioGroup.propTypes = {
  children: PropTypes.node,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  isMandatory: PropTypes.bool,
  errorText: PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  id: PropTypes.string.isRequired,
  columnWrapperClassName: PropTypes.string,
  wrapperClassName: PropTypes.string,
  direction: PropTypes.oneOf(DIRECTIONS),
  type: PropTypes.oneOf(TYPES)
};
RadioGroup.defaultProps = {
  children: null,
  value: undefined,
  defaultValue: undefined,
  onChange: null,
  isMandatory: false,
  errorText: '',
  label: '',
  description: '',
  columnWrapperClassName: '',
  wrapperClassName: '',
  direction: DIRECTIONS[1],
  type: TYPES[0]
};

export default RadioGroup;
