import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { O11ySingleDatePicker } from 'common/bifrostProxy';
import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES
} from 'features/AllBuilds/constants';
import { setSelectedFilters } from 'features/AllBuilds/slices/buildsSlice';
import PropTypes from 'prop-types';
import { getDateInFormat, getISOParsedDate } from 'utils/dateTime';

function DateRangeFilter({ setValidStatus }) {
  const dispatch = useDispatch();
  const [fromRange, setFromRange] = useState(null);
  const [toRange, setToRange] = useState(null);
  // const appliedDateRange = useSelector(
  //   findAppliedFilterByType(BUILD_FILTER_TYPES.dateRange)
  // );

  const isValid = useMemo(
    () =>
      !(
        (fromRange && !toRange) ||
        (toRange && !fromRange) ||
        fromRange > toRange
      ),
    [fromRange, toRange]
  );

  useEffect(() => {
    setValidStatus(isValid);
  }, [isValid, setValidStatus]);

  const onChangeDate = (dateObj, targetBound) => {
    try {
      const dateString = dateObj.toString();
      const date = new Date(dateString);

      const fromTime =
        targetBound === 'lowerBound' ? date.getTime() : fromRange;
      const toTime =
        targetBound === 'upperBound'
          ? new Date(date.setUTCHours(23, 59, 59, 999)).getTime()
          : toRange;

      setToRange(toTime);
      setFromRange(fromTime);

      if (fromTime && toTime) {
        dispatch(
          setSelectedFilters({
            type: BUILD_FILTER_TYPES.dateRange,
            id: `${fromTime},${toTime}`,
            operation: BUILD_FILTER_OPERATIONS.REPLACE_BY_TYPE,
            range: {
              upperBound: toTime,
              lowerBound: fromTime
            },
            text: `${getDateInFormat(fromTime)} - ${getDateInFormat(toTime)}`
          })
        );
      }
    } catch (err) {
      const fromTime = targetBound === 'lowerBound' ? '' : fromRange;
      const toTime = targetBound === 'upperBound' ? '' : toRange;
      // clear value if invalid entered by user
      setToRange(toTime);
      setFromRange(fromTime);
      dispatch(
        setSelectedFilters({
          type: BUILD_FILTER_TYPES.dateRange,
          operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_TYPE,
          range: {
            upperBound: toTime,
            lowerBound: fromTime
          }
        })
      );
    }
  };

  return (
    <>
      <div className="flex flex-col">
        <O11ySingleDatePicker
          label="Start Date"
          value={fromRange ? getISOParsedDate(fromRange) : null}
          onChange={(dateObj) => onChangeDate(dateObj, 'lowerBound')}
        />
        {!fromRange && toRange && (
          <p className="text-danger-600 text-sm">
            Please select start date to apply date filter else remove end date
            field
          </p>
        )}
      </div>
      <div className="flex flex-col">
        <O11ySingleDatePicker
          label="End Date"
          value={toRange ? getISOParsedDate(toRange) : null}
          onChange={(dateObj) => onChangeDate(dateObj, 'upperBound')}
        />
        {!toRange && fromRange && (
          <p className="text-danger-600 text-sm">
            Please select end date to apply date filter else remove start date
            field
          </p>
        )}
        {toRange && fromRange && toRange < fromRange && (
          <p className="text-danger-600 text-sm">
            End date cannot be smaller than start date
          </p>
        )}
      </div>
    </>
  );
}

DateRangeFilter.propTypes = {
  setValidStatus: PropTypes.func.isRequired
};

export default DateRangeFilter;
