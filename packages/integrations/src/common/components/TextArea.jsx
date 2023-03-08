import React from 'react';
import { TextArea } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TextAreaField = ({ value, setValue, placeholder }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <TextArea onChange={handleChange} value={value} placeholder={placeholder} />
  );
};

TextAreaField.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

TextAreaField.defaultProps = {
  value: '',
  placeholder: null
};

export default TextAreaField;
