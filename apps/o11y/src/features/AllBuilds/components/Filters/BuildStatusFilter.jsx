import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yComboBox } from 'common/bifrostProxy';
import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES
} from 'features/AllBuilds/constants';
import {
  getAppliedFiltersIdsByType,
  getStaticFiltersByType
} from 'features/AllBuilds/slices/buildsSelectors';
import { setSelectedFilters } from 'features/AllBuilds/slices/buildsSlice';
import { getComboBoxDiffStatus } from 'features/AllBuilds/utils/common';
import { capitalize } from 'utils/common';

function BuildStatusFilter() {
  const dispatch = useDispatch();
  const availableFilters = useSelector(
    getStaticFiltersByType(BUILD_FILTER_TYPES.status)
  );
  const appliedFilters = useSelector(
    getAppliedFiltersIdsByType(BUILD_FILTER_TYPES.status)
  );
  const [selectedStatus, setSelectedStatus] = useState([]);

  useEffect(() => {
    if (appliedFilters.length && !selectedStatus.length) {
      const selectedFilters = appliedFilters.map((item) => ({
        label: capitalize(item),
        value: item
      }));
      setSelectedStatus(selectedFilters);
    }
  }, [appliedFilters, selectedStatus.length]);

  if (!availableFilters.length) {
    return null;
  }

  const options = availableFilters.map((item) => ({
    label: capitalize(item),
    value: item
  }));

  const handleSelectOption = (items) => {
    const { checked, item } = getComboBoxDiffStatus(selectedStatus, items);
    if (checked) {
      dispatch(
        setSelectedFilters({
          type: BUILD_FILTER_TYPES.status,
          operation: BUILD_FILTER_OPERATIONS.ADD,
          id: item.value,
          text: capitalize(item.value)
        })
      );
    } else {
      dispatch(
        setSelectedFilters({
          type: BUILD_FILTER_TYPES.status,
          operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_ID,
          id: item.value,
          text: capitalize(item.value)
        })
      );
    }
    setSelectedStatus(items);
  };

  return (
    <O11yComboBox
      isMulti
      placeholder="Select build status"
      label="Build Status"
      options={options}
      onChange={handleSelectOption}
      value={selectedStatus}
      checkPosition="right"
      virtuosoWidth="350px"
    />
  );
}

export default BuildStatusFilter;
