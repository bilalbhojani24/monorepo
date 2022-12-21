import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
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

    const MultiElement = () => {
      return (
        <div
          className={classNames('absolute inset-y-0 flex items-center', {
            'left-0 ': multiPosition === INPUT_MULTI_POSITION[0],
            'right-0 ': multiPosition === INPUT_MULTI_POSITION[1]
          })}
        >
          <label htmlFor="currency" className="sr-only">
            {label + ' select'}
          </label>
          <select
            aria-label={label + ' select'}
            onChange={onDropdownChange}
            id={dropdownName}
            className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
    };

    const InsetElement = () => {
      return (
        <span
          className={classNames(
            isAddOnInline
              ? [
                  'pointer-events-none absolute inset-y-0 flex items-center',
                  multiPosition === INPUT_MULTI_POSITION[0] ? 'pr-3 right-0' : 'pl-3 left-0'
                ]
              : [
                  'inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500 sm:text-sm'
                ]
          )}
        >
          <span
            className={classNames('', {
              'text-gray-500 sm:text-sm': isAddOnInline
            })}
          >
            {addOnText}
          </span>
        </span>
      );
    };
    const LeftElement = () => {
      return multiPosition === INPUT_MULTI_POSITION[0] ? <MultiElement /> : <InsetElement />;
    };
    const RightElement = () => {
      return multiPosition === INPUT_MULTI_POSITION[1] ? <MultiElement /> : <InsetElement />;
    };
    const hasLeftPadding = multiPosition === INPUT_MULTI_POSITION[0] ? true : !!addOnText;
    const hasRightPadding = multiPosition === INPUT_MULTI_POSITION[1] ? true : !!addOnText;

    return (
      <div className="bifrost-input-field">
        {(label || cornerHintText) && (
          <div className="flex justify-between">
            <label htmlFor={id} id={id + 'label-wrap'} className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            {cornerHintText && <span className="text-sm text-gray-500">{cornerHintText}</span>}
          </div>
        )}
        <div
          className={classNames('mt-1 rounded-md shadow-sm', {
            'relative ': isAddOnInline,
            'flex ': !isAddOnInline
          })}
        >
          <LeftElement />
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
              'focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm block w-full border-gray-300',
              addOnText && !isAddOnInline ? ['min-w-0 flex-1'] : ['rounded-md shadow-sm'],
              isAddOnInline
                ? ['rounded-md py-2', { 'pl-20 rounded-r-md': hasLeftPadding, 'pr-16': hasRightPadding }]
                : [
                    {
                      'px-3 rounded-l-md': !addOnText
                    }
                  ],
              {
                'text-red-900 focus:border-red-500 focus:ring-red-500': errorText,
                'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-50 disabled:text-gray-500': disabled
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
            {errorText && <ExclamationCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />}
          </div>
        </div>
        {description && <p className="mt-2 text-sm text-gray-500">{description}</p>}
        {errorText && (
          <p className="mt-2 text-sm text-red-600" id={id + 'error-wrap'}>
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
  inputRef: PropTypes.oneOfType([PropTypes.shape({ current: PropTypes.any }), PropTypes.func]),
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
