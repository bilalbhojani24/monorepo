import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, MdFilterAlt } from '@browserstack/bifrost';

import { getIntegrationsThunk } from '../../../../api';
import {
  clearFilters as clearFiltersAction,
  filtersSelector,
  openFiltersSlideover,
  setFilters as setFiltersAction
} from '../../../../globalSlice';

import FilterBadges from './FilterBadges';
import QueryFilter from './QueryFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);

  const setFilters = (val) => {
    dispatch(setFiltersAction(val));
  };

  const clearFilters = () => {
    dispatch(clearFiltersAction());
  };
  const handleFilterClick = () => {
    dispatch(openFiltersSlideover());
  };
  useEffect(() => {
    dispatch(getIntegrationsThunk());
  }, [dispatch]);

  return (
    <div>
      <div className="mt-3 flex justify-between">
        <QueryFilter
          filters={filters}
          setFilters={setFilters}
          filterKey="urlSearch"
        />
        <Button
          onClick={handleFilterClick}
          wrapperClassName="h-fit"
          icon={<MdFilterAlt className="h-4 w-4" />}
          variant="secondary"
        >
          Filters
        </Button>
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
