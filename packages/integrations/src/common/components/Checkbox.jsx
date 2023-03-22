import React from 'react';
import { Checkbox as BifrostCheckbox } from '@browserstack/bifrost';
import PropTypes from 'prop-types';

const Checkbox = ({
  key,
  label,
  description,
  defaultValue,
  setFieldsData,
  fieldKey,
  fieldsData
}) => {
  const checkboxData = {
    value: key,
    label,
    description
  };
  const handleChange = (e) => {
    setFieldsData({ ...fieldsData, [fieldKey]: e.target.checked });
  };
  return (
    <BifrostCheckbox
      data={checkboxData}
      description="block"
      defaultChecked={defaultValue}
      onChange={handleChange}
      border={false}
    />
  );
};

Checkbox.propTypes = {
  key: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  description: PropTypes.string
};

Checkbox.defaultProps = {
  placeholder: null,
  description: ''
};

export default Checkbox;
