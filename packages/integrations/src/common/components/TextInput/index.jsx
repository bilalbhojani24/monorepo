import React, { useEffect, useState } from 'react';
import { InputField } from '@browserstack/bifrost';

import { ALLOWED_TYPES } from '../../constants';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import { FieldType } from '../types';

const TextField = ({
  label,
  value,
  schema,
  fieldKey,
  required,
  fieldsData,
  placeholder,
  fieldErrors,
  validations,
  defaultValue,
  setFieldsData,
  disabled = false,
  setValidationErrorForField,
  areSomeRequiredFieldsEmpty,
  clearValidationErrorForField
}) => {
  const [error, setError] = useState(null);
  const valueToRender = Array.isArray(fieldsData?.[fieldKey])
    ? (fieldsData?.[fieldKey] ?? (value || defaultValue || [])).join(',')
    : fieldsData?.[fieldKey] ?? (value || defaultValue) ?? '';
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    if (schema?.field === 'numeric') {
      // This works with integers and decimal numbers.
      const regex = new RegExp('^-?\\d*(\\.\\d+)?$');
      if (!fieldValue.match(regex)) {
        return;
      }
    }

    const val =
      schema?.field === 'multi-text' && fieldValue
        ? // field is a multi-text, split the text on comma to build
          //  array of options and trim individual field value
          fieldValue.split(',').map((str) => str.trim())
        : // single text, simply pass it
          fieldValue;

    setFieldsData((prev) => ({ ...prev, [fieldKey]: val }));
  };

  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );

  const clearError = () => {
    setError(null);
  };

  useEffect(() => {
    setError(requiredFieldError || fieldErrors?.[fieldKey]);
  }, [requiredFieldError, fieldErrors, fieldKey]);

  useEffect(() => {
    if (
      valueToRender &&
      !ALLOWED_TYPES.includes(typeof fieldsData?.[fieldKey]) &&
      typeof setFieldsData === 'function'
    ) {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: valueToRender }));
    }
  }, [value, defaultValue, setFieldsData, fieldKey, fieldsData, valueToRender]);

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
                setValidationErrorForField(fieldKey, validationErrorMessage);
              } else {
                clearValidationErrorForField(fieldKey);
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
        clearValidationErrorForField(fieldKey);
      }
    }
  };

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <InputField
        id={fieldKey}
        onChange={handleChange}
        value={valueToRender}
        placeholder={placeholder}
        onBlur={validateInput}
        errorText={error}
        type="text"
        disabled={disabled}
        label={label}
        isMandatory={required}
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
