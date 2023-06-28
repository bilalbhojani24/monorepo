import React, { useEffect } from 'react';
import { TextArea } from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import { FieldType } from '../types';

const TextAreaField = ({
  label,
  value,
  fieldKey,
  required,
  fieldsData,
  fieldErrors,
  placeholder,
  defaultValue,
  setFieldsData,
  areSomeRequiredFieldsEmpty
}) => {
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    setFieldsData((prev) => ({ ...prev, [fieldKey]: fieldValue }));
  };

  useEffect(() => {
    const valueToHydrateWith = value || defaultValue;
    const valueInState = fieldsData[fieldKey];
    if (valueToHydrateWith && typeof valueInState !== 'string') {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: valueToHydrateWith }));
    }
  }, [value, defaultValue, fieldsData, fieldKey, setFieldsData]);

  return (
    <TextArea
      id={fieldKey}
      onChange={handleChange}
      value={(fieldsData[fieldKey] || value || defaultValue) ?? ''}
      placeholder={placeholder}
      label={label}
      isMandatory={required}
      errorText={requiredFieldError || fieldErrors?.[fieldKey]}
    />
  );
};

TextAreaField.propTypes = {
  ...FieldType
};

TextAreaField.defaultProps = {
  value: '',
  placeholder: null
};

export default TextAreaField;
