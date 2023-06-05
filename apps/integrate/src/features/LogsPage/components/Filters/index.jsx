import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import { getIntegrationsThunk } from 'api';
import { INTGButton } from 'common/bifrostProxy';
import {
  clearAllFilters,
  clearFilters as clearFiltersAction,
  filtersSelector,
  openFiltersSlideover,
  setFilters as setFiltersAction
} from 'globalSlice/index';

import FilterBadges from './FilterBadges';
import QueryFilter from './QueryFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  const setFilters = (val) => {
    dispatch(setFiltersAction(val));
  };

  const clearFilters = useCallback(() => {
    dispatch(clearFiltersAction());
  }, [dispatch]);

  const handleFilterClick = () => {
    dispatch(openFiltersSlideover());
  };
  useEffect(() => {
    dispatch(getIntegrationsThunk());
    return () => {
      dispatch(clearAllFilters());
    };
  }, [clearFilters, dispatch]);

  return (
    <div>
      <div className="mt-3 flex justify-between">
        <QueryFilter
          filters={filters}
          setFilters={setFilters}
          filterKey="urlSearch"
        />
        <INTGButton
          onClick={handleFilterClick}
          wrapperClassName="h-fit"
          icon={<MdFilterAlt className="h-4 w-4" />}
          variant="primary"
          colors="white"
        >
          Filters
        </INTGButton>
      </div>
      <FilterBadges
        filters={filters}
        setFilters={setFilters}
        clearFilters={clearFilters}
      />
    </div>
  );
};
export default Filters;
