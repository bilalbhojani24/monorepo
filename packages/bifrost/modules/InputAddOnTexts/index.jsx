import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExclamationCircleIcon } from '../Icon';
import './styles.scss';

const InputAddOnTexts = forwardRef(
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
      isAddOnInline,
      label,
      leadingAddOnText,
      onBlur,
      onChange,
      onFocus,
      placeholder,
      trailingAddOnText,
      type,
      ...rest
    },
    ref
  ) => {
    return (
      <div className="bifrost-input-field">
        {(label || cornerHintText) && (
          <div className="flex justify-between">
            <label htmlFor={id} id={id + 'label-wrap'} className="block text-sm font-medium text-base-700">
              {label}
            </label>
            {cornerHintText && <span className="text-sm text-base-500">{cornerHintText}</span>}
          </div>
        )}
        <div
          className={classNames('mt-1 rounded-md shadow-sm', {
            'relative ': isAddOnInline,
            'flex ': !isAddOnInline
          })}
        >
          {leadingAddOnText && (
            <span
              className={classNames('', {
                'inline-flex items-center rounded-l-md border border-r-0 border-base-300 bg-base-50 px-3 text-base-500 sm:text-sm':
                  !isAddOnInline,
                'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3': isAddOnInline
              })}
            >
              <span
                className={classNames('', {
                  'text-base-500 sm:text-sm': isAddOnInline
                })}
              >
                {leadingAddOnText}
              </span>
            </span>
          )}
          <input
            aria-invalid={!!errorText}
            aria-describedby={id + (!!errorText ? 'error-wrap' : 'label-wrap')}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            type={type}
            ref={ref || inputRef}
            id={id}
            className={classNames(
              'focus:border-brand-500 focus:ring-brand-500 sm:text-sm block w-full border-base-300',
              (leadingAddOnText || trailingAddOnText) && !isAddOnInline ? ['min-w-0 flex-1'] : ['rounded-md shadow-sm'],
              isAddOnInline
                ? ['rounded-md py-2', { 'pl-16 rounded-r-md': leadingAddOnText, 'pr-16': trailingAddOnText }]
                : [
                    {
                      'px-3 rounded-l-md': !leadingAddOnText
                    }
                  ],
              {
                'text-danger-900 focus:border-danger-500 focus:ring-danger-500': errorText,
                'disabled:cursor-not-allowed disabled:border-base-200 disabled:bg-base-50 disabled:text-base-500':
                  disabled
              }
            )}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete={autoComplete}
            {...rest}
          />
          {trailingAddOnText && (
            <div
              className={classNames(
                isAddOnInline
                  ? 'pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3'
                  : 'relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-base-300 bg-base-50 px-4 py-2 text-sm font-medium '
              )}
            >
              <span className="text-base-500 sm:text-sm">{trailingAddOnText}</span>
            </div>
          )}
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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

InputAddOnTexts.propTypes = {
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any }), PropTypes.func]),
  isAddOnInline: PropTypes.bool,
  label: PropTypes.string,
  leadingAddOnText: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  trailingAddOnText: PropTypes.string,
  type: PropTypes.string
};

InputAddOnTexts.defaultProps = {
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: '',
  description: '',
  disabled: false,
  errorText: '',
  inputRef: null,
  isAddOnInline: false,
  label: '',
  leadingAddOnText: '',
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  trailingAddOnText: '',
  type: 'text'
};

export default InputAddOnTexts;
