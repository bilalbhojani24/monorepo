import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DatePickerField from 'common/DatePickerField';
import {
  ADV_FILTER_TYPES,
  FILTER_OPERATION_TYPE
} from 'features/FilterSkeleton/constants';
import { setAppliedFilter } from 'features/FilterSkeleton/slices/filterSlice';
import { findAppliedFilterByType } from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

const DatePickerFilterField = ({ supportedKeys, updateFiltersAPI }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

    if (updateFiltersAPI) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('daterangetype', key);
      if (key === 'custom') {
        searchParams.set(
          'dateRange',
          `${timeBounds.lowerBound},${timeBounds.upperBound}`
        );
      }
      navigate({ search: searchParams.toString() });
      updateFiltersAPI();
    }
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
  supportedKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
  updateFiltersAPI: PropTypes.func
};

DatePickerFilterField.defaultProps = {
  updateFiltersAPI: null
};

export default DatePickerFilterField;
