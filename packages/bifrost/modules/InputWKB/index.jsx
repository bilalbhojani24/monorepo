import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const InputWKB = forwardRef(
  (
    {
      autoComplete,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      id,
      inputRef,
      label,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      type,
      keyCombination,
      ...rest
    },
    ref,
  ) => (
    <div className="bifrost-input-field">
      {(label || cornerHintText) && (
        <div className="mb-1 flex justify-between">
          <label
            htmlFor={id}
            id={`${id}label-wrap`}
            className="block text-sm font-medium text-base-700"
          >
            {label}
          </label>
          {cornerHintText && (
            <span className="text-sm text-base-500">{cornerHintText}</span>
          )}
        </div>
      )}
      <div className="relative flex items-center">
        <input
          aria-label={label}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          type={type}
          ref={ref || inputRef}
          name={label}
          id={id}
          className="block w-full rounded-md border-base-300 pr-12 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
          {...rest}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded border border-base-200 px-2 font-sans text-sm font-medium text-base-400">
            {keyCombination}
          </kbd>
        </div>
      </div>
      {description && (
        <p className="mt-2 text-sm text-base-500">{description}</p>
      )}
    </div>
  ),
);

InputWKB.propTypes = {
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.any }),
    PropTypes.func,
  ]),
  keyCombination: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

InputWKB.defaultProps = {
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: '',
  description: '',
  disabled: false,
  inputRef: null,
  keyCombination: '',
  label: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  type: 'text',
};

export default InputWKB;
