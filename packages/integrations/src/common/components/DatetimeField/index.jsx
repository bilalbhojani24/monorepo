import React, { useEffect } from 'react';
import {
  SelectMenu,
  SelectMenuOptionGroup,
  SelectMenuOptionItem,
  SelectMenuTrigger,
  SingleDatepicker
} from '@browserstack/bifrost';
import { usePrevious } from '@browserstack/hooks';
import { parseDate } from '@internationalized/date';

import useRequiredFieldError from '../../hooks/useRequiredFieldError';
import Label from '../Label';
import { FieldType } from '../types';

import { TIME_PICKER_OPTIONS } from './constants';

const DatetimeField = ({
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

  const valueFromProps = value || defaultValue;
  const prevValueFromProps = usePrevious(valueFromProps);

  useEffect(() => {
    if (
      valueFromProps &&
      valueFromProps !== prevValueFromProps &&
      typeof setFieldsData === 'function'
    ) {
      setFieldsData((prev) => ({
        ...prev,
        [fieldKey]: valueFromProps
      }));
    }
  }, [valueFromProps, prevValueFromProps, setFieldsData, fieldsData, fieldKey]);

  const valueToRender =
    fieldsData?.[fieldKey] && new Date(fieldsData?.[fieldKey]);

  const dateToRender =
    valueToRender &&
    `${valueToRender.getFullYear()}-${
      valueToRender.getMonth() + 1 > 9
        ? valueToRender.getMonth() + 1
        : `0${valueToRender.getMonth() + 1}`
    }-${
      valueToRender.getDate() > 9
        ? valueToRender.getDate()
        : `0${valueToRender.getDate()}`
    }`;

  const time =
    valueToRender &&
    valueToRender.toTimeString().split(':').slice(0, 2).join(':');

  const timeToRender = time
    ? TIME_PICKER_OPTIONS.find((item) => item.label === time)
    : null;

  // should pass undefined in case there's no date since parseDate
  // is not null-error safe
  const parsedValueForDatePicker = dateToRender && parseDate(dateToRender);
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
      newDate = new Date(e.year, e.month - 1, e.day, 0, 0);
    }
    setFieldsData((prev) => ({
      ...prev,
      [fieldKey]: newDate.toISOString()
    }));
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
    setFieldsData((prev) => ({
      ...prev,
      [fieldKey]: newDate.toISOString()
    }));
  };

  return (
    <div
      className="py-3"
      data-field-type={schema?.field}
      data-field-key={fieldKey}
    >
      <Label required={required} label={label} />
      <div className="flex">
        <div className="flex-1">
          <SingleDatepicker
            onChange={handleDateChange}
            value={parsedValueForDatePicker}
            errorMessage={requiredFieldError || fieldErrors?.[fieldKey]}
          />
        </div>
        <div className="ml-2 flex-1">
          <SelectMenu
            value={timeToRender}
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
