import React, { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import { getComboBoxDiffStatus } from 'features/AllBuilds/utils/common';
import { setSelectedFilters } from 'features/FilterSkeleton/slices/filterSlice';
import {
  getSelectedFiltersByType,
  getStaticFiltersByType
} from 'features/FilterSkeleton/slices/selectors';
import PropTypes from 'prop-types';

const MultiSelectStaticFilter = ({ type, placeholder, label }) => {
  const dispatch = useDispatch();

  const staticOptions = useSelector(getStaticFiltersByType(type));
  const selectedFilters = useSelector(getSelectedFiltersByType(type));

  const selected = useMemo(
    () =>
      selectedFilters.map((item) => ({
        label: item.text,
        value: item.value
      })),
    [selectedFilters]
  );

  const handleSelect = useCallback(
    (items) => {
      const { checked, item } = getComboBoxDiffStatus(selected, items);

      if (checked) {
        dispatch(
          setSelectedFilters({
            type,
            operationType: 'addOperation',
            id: `${type}:${item.value}`,
            text: item.label,
            value: item.value
          })
        );
      } else {
        dispatch(
          setSelectedFilters({
            type,
            operationType: 'removeOperation',
            id: `${type}:${item.value}`,
            text: item.label,
            value: item.value
          })
        );
      }
    },
    [dispatch, selected, type]
  );

  return (
    <O11yComboBox
      isMulti
      placeholder={placeholder}
      label={label}
      options={staticOptions}
      onChange={handleSelect}
      value={selected}
      checkPosition="right"
      virtuosoWidth="350px"
    />
  );
};

MultiSelectStaticFilter.propTypes = {
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default MultiSelectStaticFilter;
