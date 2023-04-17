import React from 'react';
import { SingleDatepicker } from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType } from '../types';

const DateField = ({
  label,
  schema,
  fieldKey,
  required,
  fieldsData,
  fieldErrors,
  setFieldsData,
  areSomeRequiredFieldsEmpty
}) => {
  const requiredFieldError = useRequiredFieldError(
    required,
    fieldsData?.[fieldKey],
    areSomeRequiredFieldsEmpty
  );

  const handleChange = (e) => {
    const fieldVal = `${e.year}-${e.month}-${e.day}`;
    setFieldsData({
      ...fieldsData,
      [fieldKey]: fieldVal
    });
  };

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <Label required={required} label={label} />
      <SingleDatepicker
        onChange={handleChange}
        errorMessage={requiredFieldError || fieldErrors?.[fieldKey]}
      />
    </div>
  );
};

DateField.propTypes = {
  ...FieldType
};

DateField.defaultProps = {};

export default DateField;
