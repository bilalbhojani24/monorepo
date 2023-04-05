import React, { useEffect, useState } from 'react';
import { InputField } from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType } from '../types';

const TextField = ({
  fieldsData,
  setFieldsData,
  placeholder,
  required,
  label,
  value,
  fieldKey,
  schema,
  validations,
  defaultValue,
  fieldErrors,
  areSomeRequiredFieldsEmpty,
  disabled = false
}) => {
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const fieldValue = e.target.value;

    const val =
      schema?.field === 'multi-text' && fieldValue
        ? // field is a multi-text, split the text on comma to build
          //  array of options and trim individual field value
          fieldValue.split(',').map((str) => str.trim())
        : // single text, simply pass it
          fieldValue;

    setFieldsData({ ...fieldsData, [fieldKey]: val });
  };
  const valueToRender = Array.isArray(fieldsData?.[fieldKey])
    ? (fieldsData?.[fieldKey] || value || defaultValue || []).join(',')
    : (fieldsData?.[fieldKey] || value || defaultValue) ?? '';

  const requiredFieldError = useRequiredFieldError(
    required,
    valueToRender,
    areSomeRequiredFieldsEmpty
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    setError(requiredFieldError || fieldErrors?.[fieldKey]);
  }, [requiredFieldError, fieldErrors, fieldKey]);

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const validateInput = (e) => {
    const input = e.target.value.trim();
    if (validations) {
      if (input) {
        const errors = [];
        validations.forEach(
          ({ regex, 'error-message': validationErrorMessage }) => {
            let validationRegex = null;
            validationRegex = new RegExp(regex);
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
    <div className="py-3">
      <Label required={required} label={label} />
      <InputField
        onChange={handleChange}
        value={valueToRender}
        placeholder={placeholder}
        onBlur={validateInput}
        errorText={error}
        type={schema?.field === 'numeric' ? 'number' : 'text'}
        disabled={disabled}
      />
    </div>
  );
};

TextField.propTypes = {
  ...FieldType
};

TextField.defaultProps = {
  placeholder: null
};

export default TextField;
