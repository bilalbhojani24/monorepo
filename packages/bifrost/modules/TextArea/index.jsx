import React from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import './styles.scss';

const TextArea = (props) => {
  const {
    defaultValue,
    disabled,
    id,
    label,
    name,
    onChange,
    placeholder,
    rows,
    value,
    isResizable
  } = props;

  return (
    <div>
      <label htmlFor={id} className="text-base-700 block text-sm font-medium">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={rows}
          name={name}
          id={id}
          defaultValue={defaultValue}
          className={twClassNames(
            'border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md shadow-sm sm:text-sm',
            {
              'resize-none': !isResizable
            }
          )}
          disabled={disabled}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

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
  isResizable: PropTypes.bool
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
  isResizable: false
};

export default TextArea;
