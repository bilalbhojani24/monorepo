import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

const TextArea = ({
  defaultValue,
  disabled,
  id,
  label,
  name,
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
      className={twClassNames('text-base-700 block text-sm font-medium', {
        'opacity-25 cursor-not-allowed': disabled
      })}
    >
      {label}
      {isMandatory && <span className="text-danger-600 ml-0.5">*</span>}
    </label>
    <div className="mt-1">
      <textarea
        rows={rows}
        name={name}
        id={id}
        defaultValue={defaultValue}
        className={twClassNames(
          'min-h-[38px] border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md shadow-sm sm:text-sm',
          {
            'resize-none': !isResizable,
            'opacity-25 cursor-not-allowed': disabled
          }
        )}
        disabled={disabled}
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        isMandatory={isMandatory}
        {...props}
      />
    </div>
  </div>
);

TextArea.propTypes = {
  id: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
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
  disabled: false,
  label: '',
  name: '',
  onChange: null,
  placeholder: '',
  rows: 3,
  value: undefined,
  isResizable: false,
  isMandatory: false
};

export default TextArea;
