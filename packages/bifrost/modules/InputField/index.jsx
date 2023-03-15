import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '../Icon';

const InputField = forwardRef(
  (
    {
      addOnBefore,
      addOnAfter,
      autoComplete,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      errorText,
      id,
      inputRef,
      isTrailingNodeClickable,
      isMandatory,
      label,
      leadingIcon,
      onBlur,
      onChange,
      onKeyDown,
      onFocus,
      placeholder,
      readonly,
      type,
      trailingIcon,
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
            {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
          </label>
          {cornerHintText && (
            <span className="text-base-500 text-sm">{cornerHintText}</span>
          )}
        </div>
      )}
      <div className={twClassNames('flex w-full shadow-sm')}>
        {addOnBefore}
        <div
          className={twClassNames(
            'rounded-md w-full flex items-center border-1 border border-base-300 z-10 focus-within:ring-1 focus-within:ring-brand-500 focus-within:border-brand-500',
            {
              'border-danger-500 focus-within:border-danger-500 focus-within:outline-danger-500':
                errorText,
              'cursor-not-allowed border-base-200 bg-base-50 pointer-events-none':
                disabled,
              'bg-base-50 bg-clip-padding border-base-300 focus-within:border-brand-600 focus-within:outline-brand-600':
                readonly,
              'rounded-l-none': addOnBefore,
              'rounded-r-none': addOnAfter
            },
            wrapperClassName
          )}
        >
          {leadingIcon && <div className="pl-3">{leadingIcon}</div>}
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
              'border-none flex-1 rounded-md bg-transparent focus:ring-0 block rounded-md border-base-300 shadow-sm sm:text-sm',
              {
                'text-danger-900': errorText,
                'disabled:text-base-500': disabled,
                'text-base-900 focus:text-base-700': readonly
              }
            )}
            placeholder={placeholder}
            readOnly={readonly}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
          />

          {(trailingIcon || errorText) && (
            <div
              className={twClassNames('flex items-center pr-3 gap-1', {
                'pointer-events-none': !isTrailingNodeClickable
              })}
            >
              {trailingIcon}
              {errorText && (
                <ExclamationCircleIcon
                  className="text-danger-500 h-5 w-5"
                  aria-hidden="true"
                />
              )}
            </div>
          )}
        </div>
        {addOnAfter}
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
  isTrailingNodeClickable: PropTypes.bool,
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  leadingIcon: PropTypes.node,
  trailingIcon: PropTypes.node,
  addOnBefore: PropTypes.node,
  addOnAfter: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
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
  isTrailingNodeClickable: false,
  isMandatory: false,
  label: '',
  leadingIcon: null,
  trailingIcon: null,
  addOnBefore: null,
  addOnAfter: null,
  onBlur: () => {},
  onChange: () => {},
  onKeyDown: () => {},
  onFocus: () => {},
  placeholder: '',
  readonly: false,
  type: 'text',
  value: undefined,
  wrapperClassName: ''
};

export default InputField;
