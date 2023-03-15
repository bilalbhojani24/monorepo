import React from 'react';
import { InputField } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from './Label';

const TextField = ({
  fieldsData,
  setFieldsData,
  placeholder,
  required,
  label,
  fieldKey,
  schema
}) => {
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    const val =
      schema?.field === 'multi-text' && fieldValue
        ? fieldValue.split(',').map((str) => str.trim())
        : fieldValue;
    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };
  const valueToRender = Array.isArray(fieldsData[fieldKey])
    ? fieldsData[fieldKey].join(',')
    : fieldsData[fieldKey];
  return (
    <>
      <Label required={required} label={label} />
      <InputField
        onChange={handleChange}
        value={valueToRender}
        placeholder={placeholder}
      />
    </>
  );
};

TextField.propTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

TextField.defaultProps = {
  value: '',
  placeholder: null
};

export default TextField;
