import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterSkeleton from 'features/FilterSkeleton';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

import FilterSlideoverBody from '../components/FilterSlideoverBody';
import { getSnPTestsFiltersData } from '../slices/dataSlice';
import { getSnPTestFilterByKey } from '../slices/selectors';

const FiltersSlideover = memo(
  ({ isVisible, onClose, onApplyFilter, allBuildNames }) => {
    const dispatch = useDispatch();
    const activeProject = useSelector(getActiveProject);
    const appliedBuildNames = useSelector((state) =>
      getSnPTestFilterByKey(state, 'buildName')
    );
    const isMuted = useSelector((state) =>
      getSnPTestFilterByKey(state, 'isMuted')
    );
    const isFlaky = useSelector((state) =>
      getSnPTestFilterByKey(state, 'isFlaky')
    );

    const [filters, setFilters] = useState({
      buildNames: [],
      isMuted: false,
      isFlaky: false
    });

    useEffect(() => {
      dispatch(
        getSnPTestsFiltersData({
          normalisedName: activeProject?.normalisedName
        })
      );
    }, [activeProject?.normalisedName, dispatch]);

    useEffect(() => {
      setFilters({
        buildNames: appliedBuildNames.map((build) => ({
          label: build,
          value: build
        })),
        isMuted,
        isFlaky
      });
    }, [isMuted, isFlaky, appliedBuildNames]);

    const handleApplyFilter = useCallback(() => {
      onApplyFilter({
        ...filters,
        buildNames: filters.buildNames.map((build) => build.value)
      });
    }, [filters, onApplyFilter]);

    const handleClose = () => {
      setFilters({
        buildNames: appliedBuildNames.map((build) => ({
          label: build,
          value: build
        })),
        isMuted,
        isFlaky
      });
      onClose();
    };

    return (
      <>
        <FilterSkeleton
          isVisible={isVisible}
          onClose={handleClose}
          onApply={handleApplyFilter}
        >
          {isVisible && (
            <FilterSlideoverBody
              allBuildNames={allBuildNames}
              filters={filters}
              setFilters={setFilters}
            />
          )}
        </FilterSkeleton>
      </>
    );
  }
);

FiltersSlideover.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onApplyFilter: PropTypes.func.isRequired,
  allBuildNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default FiltersSlideover;
