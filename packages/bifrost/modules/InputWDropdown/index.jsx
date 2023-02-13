import React, { forwardRef } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { ExclamationCircleIcon } from '../Icon';

import { INPUT_MULTI_POSITION } from './const/inputMultiConstants';

import './styles.scss';

const InputWDropdown = forwardRef(
  (
    {
      autoComplete,
      cornerHintText,
      defaultValue,
      description,
      disabled,
      dropdownList,
      dropdownName,
      errorText,
      id,
      inputRef,
      label,
      addOnText,
      addOnIcon,
      multiType,
      multiPosition,
      onBlur,
      onDropdownChange,
      onChange,
      onFocus,
      placeholder,
      type,
      ...rest
    },
    ref
  ) => {
    const isAddOnInline = true;

    const MultiElement = () => (
      <div
        className={twClassNames('absolute inset-y-0 flex items-center', {
          'left-0 ': multiPosition === INPUT_MULTI_POSITION[0],
          'right-0 ': multiPosition === INPUT_MULTI_POSITION[1]
        })}
      >
        <label htmlFor="currency" className="sr-only">
          {`${label} select`}
        </label>
        <select
          aria-label={`${label} select`}
          onChange={onDropdownChange}
          id={dropdownName}
          className="text-base-500 focus:border-brand-500 focus:ring-brand-500 h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 sm:text-sm"
        >
          {dropdownList?.length ? (
            dropdownList.map((item) => <option>{item}</option>)
          ) : (
            <option disabled selected value>
              N/A
            </option>
          )}
        </select>
      </div>
    );

    const InsetElement = () => (
      <span
        className={twClassNames(
          isAddOnInline
            ? [
                'pointer-events-none absolute inset-y-0 flex items-center',
                multiPosition === INPUT_MULTI_POSITION[0]
                  ? 'right-0 pr-3'
                  : 'left-0 pl-3'
              ]
            : [
                'inline-flex items-center rounded-l-md border border-r-0 border-base-300 bg-base-50 px-3 text-base-500 sm:text-sm'
              ]
        )}
      >
        <span
          className={twClassNames('', {
            'text-base-500 sm:text-sm': isAddOnInline
          })}
        >
          {addOnText}
        </span>
      </span>
    );
    const LeftElement = () =>
      multiPosition === INPUT_MULTI_POSITION[0] ? (
        <MultiElement />
      ) : (
        <InsetElement />
      );
    const RightElement = () =>
      multiPosition === INPUT_MULTI_POSITION[1] ? (
        <MultiElement />
      ) : (
        <InsetElement />
      );
    const hasLeftPadding =
      multiPosition === INPUT_MULTI_POSITION[0] ? true : !!addOnText;
    const hasRightPadding =
      multiPosition === INPUT_MULTI_POSITION[1] ? true : !!addOnText;

    return (
      <div className="bifrost-input-field">
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
        <div
          className={twClassNames('rounded-md shadow-sm', {
            'relative ': isAddOnInline,
            'flex ': !isAddOnInline
          })}
        >
          <LeftElement />
          <input
            aria-invalid={!!errorText}
            aria-describedby={id + (errorText ? 'error-wrap' : 'label-wrap')}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
            type={type}
            ref={ref || inputRef}
            id={id}
            className={twClassNames(
              'block w-full border-base-300 focus:border-brand-500 focus:ring-brand-500 sm:text-sm',
              addOnText && !isAddOnInline
                ? ['min-w-0 flex-1']
                : ['rounded-md shadow-sm'],
              isAddOnInline
                ? [
                    'rounded-md py-2',
                    {
                      'rounded-r-md pl-20': hasLeftPadding,
                      'pr-16': hasRightPadding
                    }
                  ]
                : [
                    {
                      'rounded-l-md px-3': !addOnText
                    }
                  ],
              {
                'text-danger-900 focus:border-danger-500 focus:ring-danger-500':
                  errorText,
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
          <RightElement />
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
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
    );
  }
);

InputWDropdown.propTypes = {
  addOnIcon: PropTypes.node,
  autoComplete: PropTypes.string,
  cornerHintText: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  dropdownList: PropTypes.arrayOf(PropTypes.string),
  dropdownName: PropTypes.string,
  errorText: PropTypes.string,
  id: PropTypes.string.isRequired,
  inputRef: PropTypes.oneOfType([
    PropTypes.shape({ current: PropTypes.any }),
    PropTypes.func
  ]),
  label: PropTypes.string,
  addOnText: PropTypes.string,
  multiPosition: PropTypes.oneOf(INPUT_MULTI_POSITION),
  onBlur: PropTypes.func,
  onDropdownChange: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

InputWDropdown.defaultProps = {
  addOnIcon: null,
  autoComplete: 'off',
  cornerHintText: '',
  defaultValue: '',
  description: '',
  disabled: false,
  dropdownList: [],
  dropdownName: '',
  errorText: '',
  inputRef: null,
  label: '',
  addOnText: '',
  multiPosition: INPUT_MULTI_POSITION[0],
  onBlur: () => {},
  onDropdownChange: () => {},
  onChange: () => {},
  onFocus: () => {},
  placeholder: '',
  type: 'text'
};

export default InputWDropdown;
