import React, { useEffect, useMemo, useState } from 'react';
import { MdOutlineError } from '@browserstack/bifrost';
import { parseDate } from '@internationalized/date';
import { O11ySingleDatePicker } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

/*
  dateValue => date object or date value in seconds
*/
const getDateString = (dateValue) => {
  const date = new Date(dateValue);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${year}-${month}-${day}`;
};

const DatePickerGroup = ({
  startDate,
  endDate,
  onDateSelect,
  onErrorCb,
  minDate,
  maxDate
}) => {
  const [fromDateValue, onChangeFromDateValue] = useState(null);
  const [toDateValue, onChangeToDateValue] = useState(null);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [error, setError] = useState(false);

  const handleFromDateChange = (dateObj) => {
    const dateString = dateObj.toString();
    // const date = new Date(dateString);
    onChangeFromDateValue(dateString);
    setShowEndDatePicker(true);
    // NOTE: we don't need to trigger on from date change
    // onDateSelect({ from: date.getTime(), to: new Date(toDateValue).getTime() });
  };

  const handleToDateChange = (dateObj) => {
    const dateString = dateObj.toString();
    const date = new Date(dateString);
    onChangeToDateValue(dateString);
    onDateSelect({
      from: new Date(fromDateValue).getTime(),
      to: date.getTime()
    });
    setShowEndDatePicker(false);
  };

  useEffect(() => {
    if (startDate) {
      onChangeFromDateValue(getDateString(startDate));
    } else {
      onChangeFromDateValue(getDateString(new Date()));
    }
    if (endDate) {
      onChangeToDateValue(getDateString(endDate));
    } else {
      onChangeToDateValue(getDateString(new Date()));
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (Date.parse(fromDateValue) > Date.parse(toDateValue)) {
      setError('End date cannot be less than start date');
      onErrorCb(true);
    } else {
      setError('');
      onErrorCb(false);
    }
  }, [fromDateValue, toDateValue, onErrorCb]);

  const parsedMinDate = useMemo(() => {
    if (minDate) {
      return parseDate(getDateString(minDate));
    }
    return null;
  }, [minDate]);

  const parsedMaxDate = useMemo(() => {
    if (maxDate) {
      return parseDate(getDateString(maxDate));
    }
    return null;
  }, [maxDate]);

  const extraProps = () => {
    const restProps = {};
    if (parsedMinDate) {
      restProps.minValue = parsedMinDate;
    }
    if (parsedMaxDate) {
      restProps.maxValue = parsedMaxDate;
    }
    return restProps;
  };

  if (!fromDateValue || !toDateValue) {
    return null;
  }

  return (
    <div>
      <div className="flex w-96 items-center gap-2">
        <O11ySingleDatePicker
          onChange={handleFromDateChange}
          wrapperClassName="w-44"
          label="Start date"
          defaultValue={parseDate(fromDateValue)}
          placement="bottom start"
          {...extraProps()}
        />
        <div className="shrink-0 basis-2 pt-3">-</div>
        <O11ySingleDatePicker
          onChange={handleToDateChange}
          wrapperClassName="w-44"
          label="End date"
          defaultValue={parseDate(toDateValue)}
          placement="bottom end"
          // TODO: enhance this logic
          {...(showEndDatePicker
            ? {
                isOpen: true,
                onClose: () => {
                  setShowEndDatePicker(false);
                }
              }
            : {})}
          {...extraProps()}
        />
      </div>
      {error && (
        <div className="flex items-center gap-2">
          <MdOutlineError className="text-danger-500 h-4 w-4" />
          <span className="text-danger-500 text-sm font-normal leading-5">
            {error}
          </span>
        </div>
      )}
    </div>
  );
};

DatePickerGroup.propTypes = {
  minDate: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.number
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.number
  ]),
  startDate: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.number
  ]),
  endDate: PropTypes.oneOfType([
    PropTypes.objectOf(PropTypes.any),
    PropTypes.number
  ]),
  onDateSelect: PropTypes.func.isRequired,
  onErrorCb: PropTypes.func
};

DatePickerGroup.defaultProps = {
  onErrorCb: () => {},
  minDate: null,
  maxDate: null,
  startDate: null,
  endDate: null
};

export default DatePickerGroup;
