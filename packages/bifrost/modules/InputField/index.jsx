import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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
      // isInlineLeadingAddOn,
      // isInlineTrailingAddOn,
      label,
      // leadingAddOnText,
      leadingIcon,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      // trailingAddOnText,
      trailingIcon,
      type,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="bifrost-input-field">
        {(label || cornerHintText) && (
          <div className="flex justify-between" role="contentinfo">
            <label htmlFor={id} id={id + 'label-wrap'} className="block text-sm font-medium text-base-700">
              {label}
            </label>
            {cornerHintText && <span className="text-sm text-base-500">{cornerHintText}</span>}
          </div>
        )}
        <div className="relative mt-1 rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{leadingIcon}</div>
          <input
            aria-invalid={!!errorText}
            aria-describedby={id + (!!errorText ? 'error-wrap' : 'label-wrap')}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            type={type}
            ref={ref || inputRef}
            name={label}
            id={id}
            className={classNames(
              'block w-full rounded-md border-base-300 shadow-sm focus:border-brand-500 focus:ring-brand-500 sm:text-sm',
              {
                'text-danger-900 focus:border-danger-500 focus:ring-danger-500': errorText,
                'disabled:cursor-not-allowed disabled:border-base-200 disabled:bg-base-50 disabled:text-base-500':
                  disabled,
                'pl-10': !!leadingIcon,
                'pr-10': !!trailingIcon
              }
            )}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
            {...rest}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            {trailingIcon}
            {errorText && <ExclamationCircleIcon className="h-5 w-5 text-danger-500" aria-hidden="true" />}
          </div>
        </div>
        {description && <p className="mt-2 text-sm text-base-500">{description}</p>}
        {errorText && (
          <p className="mt-2 text-sm text-danger-600" id={id + 'error-wrap'}>
            {errorText}
          </p>
        )}
      </div>
    );
  }
);

InputField.propTypes = {
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any }), PropTypes.func]),
  label: PropTypes.string,
  leadingIcon: PropTypes.node,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  trailingIcon: PropTypes.node,
  type: PropTypes.string
};

InputField.defaultProps = {
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: '',
  description: '',
  disabled: false,
  errorText: '',
  inputRef: null,
  label: '',
  leadingIcon: null,
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  trailingIcon: null,
  type: 'text'
};

export default InputField;
