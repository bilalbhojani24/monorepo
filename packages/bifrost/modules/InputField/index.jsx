import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '../Icon';

const InputField = forwardRef(
  (
    {
      addOnBefore,
      addOnAfter,
      addOnAfterInline,
      addOnBeforeInline,
      addOnBeforeInlineWrapperClassName,
      addOnAfterInlineWrapperClassName,
      autoComplete,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      errorText,
      id,
      inputRef,
      isMandatory,
      label,
      onBlur,
      onChange,
      onKeyDown,
      onFocus,
      placeholder,
      readonly,
      type,
      value,
      wrapperClassName,
      role,
      ...props
    },
    ref
  ) => (
    <>
      {(label || cornerHintText) && (
        <div className="mb-1 flex justify-between" role={role}>
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
      <div
        className={twClassNames('w-full flex z-10 shadow-sm', wrapperClassName)}
      >
        {addOnBefore}
        <div
          className={twClassNames(
            'w-full flex items-center border-1 border border-base-300 rounded-md',
            {
              'border-danger-500 focus-within:border-danger-500 focus-within:outline-danger-500':
                errorText,
              'focus-within:ring-1 focus-within:ring-brand-500 focus-within:border-brand-500':
                !errorText,
              'border-base-200 bg-base-50': disabled,
              'bg-base-50 bg-clip-padding border-base-300 focus-within:border-brand-600 focus-within:outline-brand-600':
                readonly,
              'rounded-l-none': addOnBefore,
              'rounded-r-none': addOnAfter
            }
          )}
        >
          {addOnBeforeInline && (
            <div
              className={twClassNames(
                'pl-3',
                addOnBeforeInlineWrapperClassName
              )}
            >
              {addOnBeforeInline}
            </div>
          )}
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
              'border-none flex-1 bg-transparent focus:ring-0 block rounded-md border-base-300 shadow-sm w-full sm:text-sm disabled:cursor-not-allowed',
              {
                'text-danger-900 placeholder:text-danger-300': errorText,
                'disabled:text-base-500': disabled,
                'text-base-900 focus:text-base-700': readonly
              }
            )}
            placeholder={placeholder}
            readOnly={readonly}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
            {...props}
          />

          {(addOnAfterInline || errorText) && (
            <div
              className={twClassNames(
                'flex items-center pr-3 gap-1',
                addOnAfterInlineWrapperClassName
              )}
            >
              {errorText && (
                <ExclamationCircleIcon
                  className="text-danger-500 h-5 w-5"
                  aria-hidden="true"
                />
              )}
              {addOnAfterInline}
            </div>
          )}
        </div>
        {addOnAfter}
      </div>
      {errorText && (
        <p className="text-danger-600 mt-2 text-sm" id={`${id}error-wrap`}>
          {errorText}
        </p>
      )}
      {description && (
        <p className="text-base-500 mt-2 text-sm">{description}</p>
      )}
    </>
  )
);

InputField.propTypes = {
  autoComplete: PropTypes.string,
  addOnBefore: PropTypes.node,
  addOnAfter: PropTypes.node,
  addOnBeforeInline: PropTypes.node,
  addOnAfterInline: PropTypes.node,
  addOnBeforeInlineWrapperClassName: PropTypes.string,
  addOnAfterInlineWrapperClassName: PropTypes.string,
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
  isMandatory: PropTypes.bool,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  type: PropTypes.string,
  value: PropTypes.string,
  wrapperClassName: PropTypes.string,
  role: PropTypes.string
};

InputField.defaultProps = {
  autoComplete: 'off',
  addOnBeforeInline: null,
  addOnAfterInline: null,
  addOnBeforeInlineWrapperClassName: '',
  addOnAfterInlineWrapperClassName: '',
  cornerHintText: '',
  defaultValue: undefined,
  description: '',
  disabled: false,
  errorText: '',
  inputRef: null,
  isMandatory: false,
  label: '',
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
  wrapperClassName: '',
  role: 'contentinfo'
};

export default InputField;
