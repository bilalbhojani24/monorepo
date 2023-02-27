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
    ref
  ) => (
    <div>
      {(label || cornerHintText) && (
        <div className="mb-1 flex justify-between">
          <label
            htmlFor={id}
            id={`${id}label-wrap`}
            className="text-base-700 block text-sm font-medium"
          >
            {label}
          </label>
          {cornerHintText && (
            <span className="text-base-500 text-sm">{cornerHintText}</span>
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
          className="border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md pr-12 shadow-sm sm:text-sm"
          placeholder={placeholder}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...rest}
        />
        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="border-base-200 text-base-400 inline-flex items-center rounded border px-2 font-sans text-sm font-medium">
            {keyCombination}
          </kbd>
        </div>
      </div>
      {description && (
        <p className="text-base-500 mt-2 text-sm">{description}</p>
      )}
    </div>
  )
);

InputWKB.propTypes = {
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
    PropTypes.func
  ]),
  keyCombination: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

InputWKB.defaultProps = {
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: undefined,
  description: '',
  disabled: false,
  inputRef: null,
  keyCombination: '',
  label: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  type: 'text'
};

export default InputWKB;
