import React, { useEffect } from 'react';
import { TextArea } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

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
    fieldsData[fieldKey],
    areSomeRequiredFieldsEmpty
  );
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    setFieldsData({ ...fieldsData, [fieldKey]: fieldValue });
  };

  useEffect(() => {
    if (value || defaultValue) {
      setFieldsData({ ...fieldsData, [fieldKey]: value || defaultValue });
    }
  }, [value, defaultValue]);

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
  value: PropTypes.string,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired
};

TextAreaField.defaultProps = {
  value: '',
  placeholder: null
};

export default TextAreaField;
