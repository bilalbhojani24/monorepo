import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '../Icon';

import './styles.scss';

const InputField = forwardRef(
  (
    {
      autoComplete,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      errorText,
      id,
      inputRef,
      isTrailingNodeClickable,
      label,
      leadingIcon,
      onBlur,
      onChange,
      onKeyDown,
      onFocus,
      placeholder,
      readonly,
      trailingIcon,
      type,
      value,
      wrapperClassName
    },
    ref
  ) => (
    <div>
      {(label || cornerHintText) && (
        <div className="mb-1 flex justify-between" role="contentinfo">
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
      <div
        className={twClassNames(
          'relative rounded-md shadow-sm',
          wrapperClassName
        )}
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          {leadingIcon}
        </div>
        <input
          aria-invalid={!!errorText}
          aria-describedby={id + (errorText ? 'error-wrap' : 'label-wrap')}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onKeyDown={onKeyDown}
          type={type}
          ref={ref || inputRef}
          name={label}
          id={id}
          className={twClassNames(
            'block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm',
            {
              'text-danger-900 border-danger-500 ring-danger-500': errorText,
              'disabled:cursor-not-allowed disabled:border-base-200 disabled:bg-base-50 disabled:text-base-500':
                disabled,
              'text-base-900 bg-base-50 bg-clip-padding border border-solid border-base-300 focus:text-base-700  focus:border-brand-600 focus:outline-none':
                readonly,
              'pl-10': !!leadingIcon,
              'pr-10': !!trailingIcon
            }
          )}
          placeholder={placeholder}
          readOnly={readonly}
          onFocus={onFocus}
          onBlur={onBlur}
          autoComplete={autoComplete}
        />
        <div
          className={twClassNames(
            'absolute inset-y-0 right-0 flex items-center pr-3',
            {
              'pointer-events-none': !isTrailingNodeClickable
            }
          )}
        >
          {trailingIcon}
          {errorText && (
            <ExclamationCircleIcon
              className="text-danger-500 h-5 w-5"
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      {description && (
        <p className="text-base-500 mt-2 text-sm">{description}</p>
      )}
      {errorText && (
        <p className="text-danger-600 mt-2 text-sm" id={`${id}error-wrap`}>
          {errorText}
        </p>
      )}
    </div>
  )
);

InputField.propTypes = {
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  label: PropTypes.string,
  leadingIcon: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  trailingIcon: PropTypes.node,
  type: PropTypes.string,
  value: PropTypes.string,
  isTrailingNodeClickable: PropTypes.bool,
  wrapperClassName: PropTypes.string
};

InputField.defaultProps = {
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: undefined,
  description: '',
  disabled: false,
  errorText: '',
  inputRef: null,
  label: '',
  leadingIcon: null,
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  placeholder: '',
  readonly: false,
  trailingIcon: null,
  type: 'text',
  value: undefined,
  isTrailingNodeClickable: false,
  wrapperClassName: ''
};

export default InputField;
