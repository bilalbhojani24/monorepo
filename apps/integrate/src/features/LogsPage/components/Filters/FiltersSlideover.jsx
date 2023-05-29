import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  INTGButton,
  INTGLoader,
  INTGSlideover,
  INTGSlideoverBody,
  INTGSlideoverHeader
} from '../../../../common/bifrostProxy';
import { LOADING_STATUS } from '../../../../constants/loadingConstants';
import {
  closeFiltersSlideover,
  configurationsLoadingSelector,
  configurationsSelector,
  FILTER_KEY,
  filtersSelector,
  integrationsLoadingSelector,
  integrationsSelector,
  isFiltersSlideoverOpenSelector,
  setFilters as setFiltersAction
} from '../../../../globalSlice';
import { METHOD_OPTIONS, STATUS_OPTIONS } from '../../constants';

import DateRangeFilter from './DateRangeFilter';
import SelectFilter from './SelectFilter';

const FilterSlideover = () => {
  const filters = useSelector(filtersSelector);
  const [slideoverFilters, setSlideoverFilters] = useState(filters);
  useEffect(() => {
    setSlideoverFilters(filters);
  }, [filters]);

  const isOpen = useSelector(isFiltersSlideoverOpenSelector);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(closeFiltersSlideover());
    setSlideoverFilters(filters);
  };

  const setFilters = (val) => {
    dispatch(setFiltersAction(val));
  };
  const integrations = useSelector(integrationsSelector);
  const configurations = useSelector(configurationsSelector);
  const areIntegrationsLoading =
    useSelector(integrationsLoadingSelector) === LOADING_STATUS.PENDING;
  const areConfigurationsLoading =
    useSelector(configurationsLoadingSelector) === LOADING_STATUS.PENDING;

  const handleApplyFilters = () => {
    setFilters(slideoverFilters);
    handleClose();
  };

  const handleCancelFilters = () => {
    handleClose();
  };

  const isSlideoverContentLoading =
    areIntegrationsLoading || areConfigurationsLoading;

  return (
    <INTGSlideover
      show={isOpen}
      slideoverWidth="overflow-y"
      onOverlayClick={handleClose}
      backgroundOverlay
      topMarginElementId="integrate-header-id"
      onClose={handleClose}
      size="md"
    >
      <INTGSlideoverHeader
        dismissButton
        handleDismissClick={handleClose}
        heading="Filters"
        wrapperClassName="bg-base-50"
      />
      <INTGSlideoverBody>
        {isSlideoverContentLoading ? (
          <INTGLoader wrapperClassName="h-full" />
        ) : (
          <div className="flex h-full flex-col">
            <div className="mb-5 flex-1 px-4">
              <SelectFilter
                label="Configuration"
                placeholder="Select"
                triggerClassName="mb-3"
                options={configurations}
                filterKey={FILTER_KEY.CONFIGURATIONS}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="HTTP Method"
                placeholder="Select"
                triggerClassName="mb-5"
                options={METHOD_OPTIONS}
                filterKey={FILTER_KEY.METHOD}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="Status Code"
                placeholder="Select"
                triggerClassName="mb-3"
                options={STATUS_OPTIONS}
                filterKey={FILTER_KEY.STATUS}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="Integration"
                placeholder="Select"
                triggerClassName="mb-3"
                options={integrations}
                filterKey={FILTER_KEY.INTEGRATIONS}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <DateRangeFilter
                label="Date"
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
            </div>
            <div className="border-base-300 flex justify-end gap-5 border-t px-4 pt-5">
              <INTGButton
                onClick={handleCancelFilters}
                wrapperClassName="h-fit"
                variant="secondary"
              >
                Cancel
              </INTGButton>
              <INTGButton onClick={handleApplyFilters} wrapperClassName="h-fit">
                Apply
              </INTGButton>
            </div>
          </div>
        )}
      </INTGSlideoverBody>
    </INTGSlideover>
  );
};

export default FilterSlideover;
