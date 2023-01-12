import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './styles.scss';

const InputWButton = forwardRef(
  (
    {
      autoComplete,
      buttonElement,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      errorText,
      icon,
      id,
      inputRef,
      label,
      addOnText,
      addOnIcon,
      multiPosition,
      onBlur,
      onButtonClick,
      onChange,
      onFocus,
      placeholder,
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
        <div className={classNames('mt-1 flex rounded-md shadow-sm', {})}>
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            {icon && <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">{icon}</div>}

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
                'block w-full rounded-none rounded-l-md border-base-300 pl-10 focus:border-brand-500 focus:ring-brand-500 sm:text-sm',

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
          </div>
          <button
            onClick={onButtonClick}
            type="button"
            className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-base-300 bg-base-50 px-4 py-2 text-sm font-medium text-base-700 hover:bg-base-100 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
          >
            {buttonElement}
          </button>
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

InputWButton.propTypes = {
  addOnIcon: PropTypes.node,
  autoComplete: PropTypes.string,
  buttonElement: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  icon: PropTypes.node,
  inputRef: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any }), PropTypes.func]),
  label: PropTypes.string,
  addOnText: PropTypes.string,
  onButtonClick: PropTypes.func,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

InputWButton.defaultProps = {
  addOnIcon: null,
  autoComplete: 'off',
  buttonElement: '.',
  cornerHintText: '',
  defaultValue: '',
  description: '',
  disabled: false,
  errorText: '',
  icon: null,
  inputRef: null,
  label: '',
  addOnText: '',
  onButtonClick: () => {},
  onBlur: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  type: 'text'
};

export default InputWButton;
