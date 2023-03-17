import React, { useState } from 'react';
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
  schema,
  validations
}) => {
  const [error, setError] = useState(null);
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

  const clearError = () => {
    setError(null);
  };

  const validateInput = (e) => {
    const input = e.target.value.trim();
    if (validations) {
      if (input) {
        const errors = [];
        validations.forEach(
          ({ regex, 'error-message': validationErrorMessage }) => {
            let validationRegex = null;
            try {
              validationRegex = new RegExp(regex);
            } catch (err) {
              console.error(err);
            }
            if (validationRegex) {
              const isValid = validationRegex.test(input);
              if (!isValid) {
                errors.push(validationErrorMessage);
              }
            }
          }
        );
        if (errors.length) {
          setError(errors[0]);
        } else {
          clearError();
        }
      } else {
        clearError();
      }
    }
  };

  return (
    <>
      <Label required={required} label={label} />
      <InputField
        onChange={handleChange}
        value={valueToRender}
        placeholder={placeholder}
        onBlur={validateInput}
        errorText={error}
        type={schema?.field === 'numeric' ? 'number' : 'text'}
      />
    </>
  );
};

TextField.propTypes = {
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

TextField.defaultProps = {
  placeholder: null
};

export default TextField;
