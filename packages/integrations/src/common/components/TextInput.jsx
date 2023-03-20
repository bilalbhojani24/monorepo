import React from 'react';
import { InputField } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const TextField = ({ value, setValue, placeholder }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <InputField
      onChange={handleChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string
};

TextField.defaultProps = {
  value: '',
  placeholder: null
};

export default TextField;
