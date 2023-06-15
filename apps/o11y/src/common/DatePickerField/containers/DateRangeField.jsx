import React, { useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import { O11yButton, O11yPopover } from 'common/bifrostProxy';
import DatePickerGroup from 'common/DatePickerGroup';
import { O11Y_DATE_RANGE } from 'constants/common';
import PropTypes from 'prop-types';
import {
  getO11yTimeBounds,
  getSubtractedUnixTime,
  getUnixEndOfDay,
  getUnixStartOfDay
} from 'utils/dateTime';

import { getCustomDateRangeSubTitles } from '../utils';

const DatePickerField = ({
  onChange,
  activeKey,
  supportedKeys,
  customKeyLowerBound,
  customKeyUpperBound
}) => {
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);

  const handleClickRange = (key) => {
    const timeBounds = getO11yTimeBounds(key);
    onChange(key, timeBounds);
  };

  const handleCustomDateRange = ({ from, to }) => {
    if (from && to && new Date(from) <= new Date(to)) {
      const fromTime = getUnixStartOfDay(from) * 1000;
      const toTime = getUnixEndOfDay(to) * 1000;
      onChange('custom', {
        upperBound: toTime,
        lowerBound: fromTime
      });
      setShowCustomDatePicker(false);
    }
  };

  return (
    <div className="flex">
      {Object.keys(O11Y_DATE_RANGE).map((key, index) => {
        if (!supportedKeys.includes(key)) {
          return null;
        }
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
                  startDate={customKeyLowerBound || Date.now()}
                  endDate={customKeyUpperBound || Date.now()}
                  minDate={getSubtractedUnixTime(2, 'months') * 1000}
                  maxDate={getUnixEndOfDay(new Date()) * 1000}
                />
              }
              wrapperClassName="p-4"
            >
              <O11yButton
                aria-label={O11Y_DATE_RANGE[key].label}
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
                    'border-brand-500 ring-1 z-[1]': activeKey === key
                  }
                )}
              >
                {activeKey === key
                  ? getCustomDateRangeSubTitles(
                      customKeyLowerBound,
                      customKeyUpperBound
                    )
                  : O11Y_DATE_RANGE[key].label}
              </O11yButton>
            </O11yPopover>
          );
        }
        return (
          <>
            <O11yButton
              aria-label={O11Y_DATE_RANGE[key].label}
              colors="white"
              onClick={() => handleClickRange(key)}
              size="large"
              variant="primary"
              wrapperClassName={twClassNames(
                `focus:z-[1] focus:ring-1 ring-brand-500 border border-base-300 
              rounded-none border-r-0 focus:ring-offset-0 text-sm font-medium text-base-700`,
                {
                  'border-brand-500 ring-1 z-[1] border-r': activeKey === key,
                  'rounded-l-md': index === 0,
                  'rounded-r-md border-r':
                    index === Object.keys(O11Y_DATE_RANGE).length - 1 &&
                    key !== 'custom'
                }
              )}
            >
              {O11Y_DATE_RANGE[key].label}
            </O11yButton>
          </>
        );
      })}
    </div>
  );
};

DatePickerField.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeKey: PropTypes.string.isRequired,
  supportedKeys: PropTypes.arrayOf(PropTypes.string),
  customKeyLowerBound: PropTypes.number,
  customKeyUpperBound: PropTypes.number
};

DatePickerField.defaultProps = {
  customKeyLowerBound: null,
  customKeyUpperBound: null,
  supportedKeys: Object.keys(O11Y_DATE_RANGE)
};

export default DatePickerField;
