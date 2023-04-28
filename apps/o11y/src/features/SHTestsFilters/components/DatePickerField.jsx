import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { twClassNames } from '@browserstack/utils';
import {
  O11yButton,
  O11yDropdown,
  O11yDropdownOptionGroup,
  O11yDropdownTrigger
} from 'common/bifrostProxy';
import DatePickerGroup from 'common/DatePickerGroup';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import { getTimeBounds } from 'features/FilterSkeleton/utils';
import {
  getDateInFormat,
  getSubtractedUnixTime,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

export const DATE_RANGE_OBJECT = {
  days7: {
    key: 'days7',
    label: '7D',
    appliedText: 'Last 7 days'
  },
  days15: {
    key: 'days15',
    label: '15D',
    appliedText: 'Last 15 days'
  },
  days30: {
    key: 'days30',
    label: '30D',
    appliedText: 'Last 30 days'
  },
  custom: {
    key: 'custom',
    label: 'Custom'
  }
};

const DatePickerField = () => {
  const dispatch = useDispatch();
  const appliedDateRange = useSelector(
    findAppliedFilterByType(ADV_FILTER_TYPES.dateRange.key)
  );
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    if (appliedDateRange?.id) {
      setActiveType(appliedDateRange.id);
    } else {
      const searchParams = new URLSearchParams(window.location.search);
      const dateRangeType = searchParams.get('daterangetype');
      if (dateRangeType) {
        setActiveType(dateRangeType);
      } else {
        setActiveType(null);
      }
    }
  }, [appliedDateRange]);

  const handleClickRange = (key) => {
    const timeBounds = getTimeBounds(key);
    dispatch(
      setAppliedFilter({
        type: ADV_FILTER_TYPES.dateRange.key,
        id: key,
        operationType: 'addOperation',
        text: DATE_RANGE_OBJECT[key].appliedText,
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
    }
  };
  return (
    <div className="flex">
      {Object.keys(DATE_RANGE_OBJECT).map((key, index) => {
        if (key === 'custom') {
          return (
            <O11yDropdown align="center">
              <O11yDropdownTrigger
                aria-label={DATE_RANGE_OBJECT[key].label}
                key={key}
                wrapperClassName={twClassNames(
                  `focus:z-[1] focus:ring-1 
                ring-brand-500 border border-base-300 rounded-none rounded-r-md focus:ring-offset-0 
                focus:border-r border-r-0 text-sm font-medium text-base-700 border-r focus:outline-0`,
                  {
                    'border-brand-500 ring-1 z-[1]': activeType === key
                  }
                )}
              >
                {DATE_RANGE_OBJECT[key].label}
              </O11yDropdownTrigger>

              <O11yDropdownOptionGroup wrapperClassName="w-full p-4">
                <DatePickerGroup
                  onDateSelect={handleCustomDateRange}
                  startDate={appliedDateRange?.value.lowerBound}
                  endDate={appliedDateRange?.value?.upperBound}
                  minDate={getSubtractedUnixTime(2, 'months') * 1000}
                  maxDate={getUnixEndOfDay(new Date()) * 1000}
                />
              </O11yDropdownOptionGroup>
            </O11yDropdown>
          );
        }
        return (
          <>
            <O11yButton
              aria-label={DATE_RANGE_OBJECT[key].label}
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
                    index === Object.keys(DATE_RANGE_OBJECT).length - 1 &&
                    key !== 'custom'
                }
              )}
            >
              {DATE_RANGE_OBJECT[key].label}
            </O11yButton>
          </>
        );
      })}
    </div>
  );
};

DatePickerField.propTypes = {};

export default DatePickerField;
