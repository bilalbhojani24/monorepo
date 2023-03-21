import React from 'react';
import { TextArea } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

const TextAreaField = ({
  label,
  fieldKey,
  required,
  fieldsData,
  placeholder,
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

  return (
    <>
      <Label required={required} label={label} />
      <TextArea
        onChange={handleChange}
        value={fieldsData[fieldKey] ?? ''}
        placeholder={placeholder}
        errorText={requiredFieldError}
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
