import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yPopover } from 'common/bifrostProxy';
import DatePickerGroup from 'common/DatePickerGroup';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import { getTimeBounds } from 'features/FilterSkeleton/utils';
import PropTypes from 'prop-types';
import {
  getDateInFormat,
  getSubtractedUnixTime,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

const DatePickerFilterField = ({ dateRangeObject }) => {
  const dispatch = useDispatch();
  const appliedDateRange = useSelector(
    findAppliedFilterByType(ADV_FILTER_TYPES.dateRange.key)
  );
  const [activeType, setActiveType] = useState(null);
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  useEffect(() => {
    if (appliedDateRange?.id) {
      setActiveType(appliedDateRange.id);
    } else {
      setActiveType(null);
    }
  }, [appliedDateRange]);

  const handleClickRange = (key) => {
    const timeBounds = getTimeBounds(key);
    dispatch(
      setAppliedFilter({
        type: ADV_FILTER_TYPES.dateRange.key,
        id: key,
        operationType: 'addOperation',
        text: dateRangeObject[key].appliedText,
        value: timeBounds,
        isApplied: true
      })
    );
  };

  const handleCustomDateRange = ({ from, to }) => {
    if (from && to && new Date(from) <= new Date(to)) {
      const fromTime = getUnixStartOfDay(from) * 1000;
      const toTime = getUnixEndOfDay(to) * 1000;
      const formattedText = `${getDateInFormat(fromTime)} - ${getDateInFormat(
        toTime
      )}`;
      dispatch(
        setAppliedFilter({
          type: ADV_FILTER_TYPES.dateRange.key,
          id: 'custom',
          operationType: 'addOperation',
          text: formattedText,
          value: {
            upperBound: toTime,
            lowerBound: fromTime
          },
          isApplied: true
        })
      );
      setShowCustomDatePicker(false);
    }
  };

  return (
    <div className="flex">
      {Object.keys(dateRangeObject).map((key, index) => {
        if (key === 'custom') {
          return (
            <O11yPopover
              arrowWidth={0}
              arrowHeight={0}
              placementAlign="end"
              placementSide="bottom"
              size="md"
              show={showCustomDatePicker}
              onOpenChange={(isOpen) => {
                setShowCustomDatePicker(isOpen);
              }}
              content={
                <DatePickerGroup
                  onDateSelect={handleCustomDateRange}
                  startDate={
                    appliedDateRange?.id === 'key'
                      ? appliedDateRange?.value?.lowerBound
                      : Date.now()
                  }
                  endDate={
                    appliedDateRange?.id === 'key'
                      ? appliedDateRange?.value?.upperBound
                      : Date.now()
                  }
                  minDate={getSubtractedUnixTime(2, 'months') * 1000}
                  maxDate={getUnixEndOfDay(new Date()) * 1000}
                />
              }
              wrapperClassName="p-4"
            >
              <O11yButton
                aria-label={dateRangeObject[key].label}
                colors="white"
                onClick={() => {
                  setShowCustomDatePicker(true);
                }}
                size="large"
                variant="primary"
                wrapperClassName={twClassNames(
                  `focus:z-[1] focus:ring-1
              ring-brand-500 border border-base-300 rounded-none rounded-r-md focus:ring-offset-0
              focus:border-r border-r-0 text-sm font-medium text-base-700 border-r focus:outline-0`,
                  {
                    'border-brand-500 ring-1 z-[1]': activeType === key
                  }
                )}
              >
                {dateRangeObject[key].label}
              </O11yButton>
            </O11yPopover>
          );
        }
        return (
          <>
            <O11yButton
              aria-label={dateRangeObject[key].label}
              colors="white"
              onClick={() => handleClickRange(key)}
              size="large"
              variant="primary"
              wrapperClassName={twClassNames(
                `focus:z-[1] focus:ring-1 ring-brand-500 border border-base-300 
              rounded-none border-r-0 focus:ring-offset-0 text-sm font-medium text-base-700`,
                {
                  'border-brand-500 ring-1 z-[1] border-r': activeType === key,
                  'rounded-l-md': index === 0,
                  'rounded-r-md border-r':
                    index === Object.keys(dateRangeObject).length - 1 &&
                    key !== 'custom'
                }
              )}
            >
              {dateRangeObject[key].label}
            </O11yButton>
          </>
        );
      })}
    </div>
  );
};

DatePickerFilterField.propTypes = {
  dateRangeObject: PropTypes.objectOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.string,
      appliedText: PropTypes.string
    })
  )
};

DatePickerFilterField.defaultProps = {
  dateRangeObject: {}
};

export default DatePickerFilterField;
