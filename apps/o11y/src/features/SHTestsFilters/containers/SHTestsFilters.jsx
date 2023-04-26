import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterSkeleton from 'features/FilterSkeleton';
import { getSnPTestsFiltersData } from 'features/SuiteHealth/slices/dataSlice';
import { getActiveProject } from 'globalSlice/selectors';

import FlakyFilter from './FlakyFilter';
// import PropTypes from 'prop-types';

const SHTestsFilters = () => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  useEffect(() => {
    dispatch(
      getSnPTestsFiltersData({
        normalisedName: activeProject?.normalisedName
      })
    );
  }, [activeProject?.normalisedName, dispatch]);
  return (
    <FilterSkeleton>
      <FlakyFilter />
    </FilterSkeleton>
  );
};

SHTestsFilters.propTypes = {};

export default SHTestsFilters;
