import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11ySwitch } from 'common/bifrostProxy';
import {
  BUILD_FILTER_OPERATIONS,
  BUILD_FILTER_TYPES,
  FILTER_LABEL_MAPPING
} from 'features/AllBuilds/constants';
import { findAppliedFilterByType } from 'features/AllBuilds/slices/buildsSelectors';
import { setSelectedFilters } from 'features/AllBuilds/slices/buildsSlice';

function ArchiveSwitchFilter() {
  const dispatch = useDispatch();
  const appliedFilter = useSelector(
    findAppliedFilterByType(BUILD_FILTER_TYPES.isArchived)
  );

  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(appliedFilter?.text || false);
  }, [appliedFilter?.text]);

  const handleChangeSwitch = (value) => {
    if (value) {
      dispatch(
        setSelectedFilters({
          type: BUILD_FILTER_TYPES.isArchived,
          id: value,
          operation: BUILD_FILTER_OPERATIONS.REPLACE_BY_TYPE,
          text: value
        })
      );
    } else {
      dispatch(
        setSelectedFilters({
          type: BUILD_FILTER_TYPES.isArchived,
          id: value,
          operation: BUILD_FILTER_OPERATIONS.REMOVE_BY_TYPE,
          text: value
        })
      );
    }
    setIsChecked(value);
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-base-700 block text-sm font-medium">
        {FILTER_LABEL_MAPPING[BUILD_FILTER_TYPES.isArchived]}
      </span>
      <O11ySwitch checked={isChecked} onChange={handleChangeSwitch} />
    </div>
  );
}

export default ArchiveSwitchFilter;
