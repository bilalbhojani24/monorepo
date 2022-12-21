import React from 'react';
import PropTypes from 'prop-types';
import './styles.scss';

const TextArea = (props) => {
  const { defaultValue, disabled, id, label, name, rows } = props;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1">
        <textarea
          rows={rows}
          name={name}
          id={id}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          defaultValue={defaultValue}
          disabled={disabled}
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
  rows: PropTypes.number
};
TextArea.defaultProps = {
  id: 'comment',
  defaultValue: '',
  disabled: false,
  label: 'Add your comment',
  name: 'comment',
  rows: 3
};

export default TextArea;
