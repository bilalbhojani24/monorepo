import React, { useEffect } from 'react';
import { TextArea } from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
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
    setFieldsData({ ...fieldsData, [fieldKey]: fieldValue });
  };

  useEffect(() => {
    const valueToHydrateWith = value || defaultValue;
    const valueInState = fieldsData[fieldKey];
    if (valueToHydrateWith && typeof valueInState !== 'string') {
      setFieldsData({ ...fieldsData, [fieldKey]: valueToHydrateWith });
    }
  }, [value, defaultValue, fieldsData, fieldKey, setFieldsData]);

  return (
    <>
      <Label required={required} label={label} />
      <TextArea
        onChange={handleChange}
        value={(fieldsData[fieldKey] || value || defaultValue) ?? ''}
        placeholder={placeholder}
        errorText={requiredFieldError || fieldErrors?.[fieldKey]}
      />
    </>
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
