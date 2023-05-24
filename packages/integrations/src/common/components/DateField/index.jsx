import React, { useEffect } from 'react';
import { SingleDatepicker } from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';

import { getInternationalizedDate } from '../../../utils/getInternationalizedDate';
import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType } from '../types';

const DateField = ({
  label,
  value,
  schema,
  fieldKey,
  required,
  fieldsData,
  fieldErrors,
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
    const fieldVal = e.toString();
    setFieldsData((prev) => ({
      ...prev,
      [fieldKey]: fieldVal
    }));
  };
  const valueFromProps = value || defaultValue;
  const prevValueFromProps = usePrevious(valueFromProps);

  useEffect(() => {
    if (
      valueFromProps &&
      valueFromProps !== prevValueFromProps &&
      typeof setFieldsData === 'function'
    ) {
      setFieldsData((prev) => ({ ...prev, [fieldKey]: valueFromProps }));
    }
  }, [
    value,
    defaultValue,
    setFieldsData,
    fieldKey,
    fieldsData,
    valueFromProps,
    prevValueFromProps
  ]);

  const parsedValueForDatePicker = getInternationalizedDate(
    fieldsData?.[fieldKey]
  );

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <Label required={required} label={label} />
      <SingleDatepicker
        onChange={handleChange}
        value={parsedValueForDatePicker}
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
