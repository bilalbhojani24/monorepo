import React from 'react';
import { DateRangepicker } from '@browserstack/bifrost';
import { getLocalTimeZone, today } from '@internationalized/date';
import PropTypes from 'prop-types';

import { FILTER_KEY } from '../../../../globalSlice';
import { getInternationalizedDate } from '../../../../utils/getInternationalizedDate';

import { FiltersType } from './types';

const DateRange = ({ filters, setFilters, label }) => {
  const handleDateChange = ({ start, end }) => {
    const from = start.toString();
    const to = end.toString();
    setFilters((prev) => ({ ...prev, [FILTER_KEY.DATE]: { from, to } }));
  };

  const parsedStartValue = filters?.date?.from
    ? getInternationalizedDate(filters.date.from)
    : null;
  const parsedEndValue = filters?.date?.to
    ? getInternationalizedDate(filters.date.to)
    : null;
  const dateRangeToRender = {
    start: parsedStartValue,
    end: parsedEndValue
  };

  return (
    <DateRangepicker
      label={label}
      value={dateRangeToRender}
      wrapperClassName="bg-white"
      onChange={handleDateChange}
      minValue={today(getLocalTimeZone()).subtract({ months: 6 })}
      maxValue={today(getLocalTimeZone())}
    />
  );
};

DateRange.propTypes = {
  filters: FiltersType.isRequired,
  label: PropTypes.string.isRequired,
  setFilters: PropTypes.func.isRequired
};
export default DateRange;
