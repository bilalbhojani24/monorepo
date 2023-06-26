import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TextArea = ({
  defaultValue,
  disabled,
  description,
  id,
  label,
  name,
  errorText,
  onChange,
  placeholder,
  rows,
  value,
  isResizable,
  isMandatory,
  ...props
}) => (
  <div>
    <label
      htmlFor={id}
      className={twClassNames('text-base-700 block text-sm font-medium')}
    >
      {label}
      {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
    </label>
    <textarea
      rows={rows}
      name={name}
      id={id}
      defaultValue={defaultValue}
      className={twClassNames(
        'mt-1 min-h-[38px] border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md shadow-sm sm:text-sm',
        {
          'resize-none': !isResizable,
          'cursor-not-allowed border-base-200 bg-base-50 text-base-500':
            disabled,
          'border border-danger-300 focus:border-danger-300 focus:ring-danger-300 text-danger-900 placeholder:text-danger-300':
            errorText
        }
      )}
      disabled={disabled}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
      isMandatory={isMandatory}
      {...props}
    />

    {errorText && (
      <p className="text-danger-600 mt-2 text-sm" id={`${id}error-wrap`}>
        {errorText}
      </p>
    )}

    {description && (
      <p className={twClassNames('text-base-500 mt-2 text-sm')}>
        {description}
      </p>
    )}
  </div>
);

TextArea.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  description: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  errorText: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  value: PropTypes.string,
  isResizable: PropTypes.bool,
  isMandatory: PropTypes.bool
};
TextArea.defaultProps = {
  id: '',
  defaultValue: undefined,
  description: '',
  disabled: false,
  label: '',
  errorText: '',
  name: '',
  onChange: null,
  placeholder: '',
  rows: 3,
  value: undefined,
  isResizable: false,
  isMandatory: false
};

export default TextArea;
