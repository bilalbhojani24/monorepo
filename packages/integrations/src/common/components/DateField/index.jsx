import React from 'react';
import { SingleDatepicker } from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';

const DateField = ({
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
    const fieldVal = `${e.year}-${e.month}-${e.day}`;
    setFieldsData({
      ...fieldsData,
      [fieldKey]: fieldVal
    });
  };

  return (
    <div className="py-3">
      <Label required={required} label={label} />
      <SingleDatepicker
        onChange={handleChange}
        errorMessage={requiredFieldError || fieldErrors?.[fieldKey]}
      />
    </div>
  );
};

export default DateField;
