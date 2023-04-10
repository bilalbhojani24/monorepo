import React from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  SingleDatepicker
} from '@browserstack/bifrost';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType } from '../types';

import { TIME_PICKER_OPTIONS } from './constants';

const DatetimeField = ({
  label,
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

  const handleDateChange = (e) => {
    let newDate = null;
    if (fieldsData?.[fieldKey]) {
      const prevDate = new Date(fieldsData[fieldKey]);
      newDate = new Date(
        e.year,
        e.month - 1,
        e.day,
        prevDate.getHours(),
        prevDate.getSeconds()
      );
    } else {
      newDate = new Date(e.year, e.month - 1, e.day);
    }
    setFieldsData({
      ...fieldsData,
      [fieldKey]: newDate.toISOString()
    });
  };

  const handleTimeChange = (e) => {
    let newDate = null;
    const [newHour, newMin] = e.value
      .split(':')
      .map((item) => parseInt(item, 10));
    if (fieldsData?.[fieldKey]) {
      const prevDate = new Date(fieldsData[fieldKey]);
      newDate = new Date(
        prevDate.getFullYear(),
        prevDate.getMonth(),
        prevDate.getDate(),
        newHour,
        newMin
      );
    }
    setFieldsData({
      ...fieldsData,
      [fieldKey]: newDate.toISOString()
    });
  };

  return (
    <div className="py-3">
      <Label required={required} label={label} />
      <div className="flex">
        <div className="flex-1">
          <SingleDatepicker
            onChange={handleDateChange}
            errorMessage={requiredFieldError || fieldErrors?.[fieldKey]}
          />
        </div>
        <div className="ml-2 flex-1">
          <SelectMenu
            onChange={handleTimeChange}
            disabled={!fieldsData?.[fieldKey]}
          >
            <SelectMenuTrigger placeholder="Select Time" />
            <SelectMenuOptionGroup>
              {TIME_PICKER_OPTIONS?.map((item) => (
                <SelectMenuOptionItem key={item.value} option={item} />
              ))}
            </SelectMenuOptionGroup>
          </SelectMenu>
        </div>
      </div>
    </div>
  );
};

DatetimeField.propTypes = {
  ...FieldType
};

DatetimeField.defaultProps = {};

export default DatetimeField;
