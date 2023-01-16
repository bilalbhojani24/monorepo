import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

const TextArea = (props) => {
  const { defaultValue, disabled, id, label, name, onChange, rows, value } =
    props;

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
          className="border-base-300 focus:border-brand-500 focus:ring-brand-500 block w-full rounded-md shadow-sm sm:text-sm"
          disabled={disabled}
          onChange={onChange}
          value={value}
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
  rows: PropTypes.number,
  value: PropTypes.string,
};
TextArea.defaultProps = {
  id: '',
  defaultValue: undefined,
  disabled: false,
  label: '',
  name: '',
  onChange: null,
  rows: 3,
  value: undefined,
};

export default TextArea;
