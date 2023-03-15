import React from 'react';
import { TextArea } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

import Label from './Label';

const TextAreaField = ({
  fieldsData,
  setFieldsData,
  fieldKey,
  placeholder,
  required,
  label
}) => {
  const handleChange = (e) => {
    const fieldValue = e.target.value;
    setFieldsData({ ...fieldsData, [fieldKey]: fieldValue });
  };

  return (
    <>
      <Label required={required} label={label} />
      <TextArea
        onChange={handleChange}
        value={fieldsData[fieldKey]}
        placeholder={placeholder}
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
