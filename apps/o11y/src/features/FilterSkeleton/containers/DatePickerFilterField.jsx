import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePickerField from 'common/DatePickerField';
import {
  ADV_FILTER_TYPES,
  FILTER_OPERATION_TYPE
} from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

const DatePickerFilterField = ({ supportedKeys }) => {
  const dispatch = useDispatch();
  const appliedDateRange = useSelector(
    findAppliedFilterByType(ADV_FILTER_TYPES.dateRange.key)
  );
  const [activeType, setActiveType] = useState(null);

  useEffect(() => {
    if (appliedDateRange?.id) {
      setActiveType(appliedDateRange.id);
    } else {
      setActiveType(null);
    }
  }, [appliedDateRange]);

  const handleDateRange = (key, timeBounds) => {
    dispatch(
      setAppliedFilter({
        type: ADV_FILTER_TYPES.dateRange.key,
        id: key,
        operationType: FILTER_OPERATION_TYPE.ADD_OPERATION,
        text: '',
        value: timeBounds,
        isApplied: true
      })
    );
  };

  return (
    <DatePickerField
      activeKey={activeType}
      onChange={(key, timeBounds) => {
        handleDateRange(key, timeBounds);
      }}
      supportedKeys={supportedKeys}
      customKeyLowerBound={appliedDateRange?.value?.lowerBound}
      customKeyUpperBound={appliedDateRange?.value?.upperBound}
    />
  );
};

DatePickerFilterField.propTypes = {
  supportedKeys: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default DatePickerFilterField;
