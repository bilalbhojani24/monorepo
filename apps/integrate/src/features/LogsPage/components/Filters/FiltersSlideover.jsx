import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  INTGButton,
  INTGLoader,
  INTGSlideover,
  INTGSlideoverBody,
  INTGSlideoverFooter,
  INTGSlideoverHeader
} from 'common/bifrostProxy';
import { LOADING_STATUS } from 'constants/loadingConstants';
import { METHOD_OPTIONS, STATUS_OPTIONS } from 'features/LogsPage/constants';
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
} from 'globalSlice/index';

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
        wrapperClassName="border-b border-base-300"
      />
      <INTGSlideoverBody wrapperClassName="pb-0">
        {isSlideoverContentLoading ? (
          <INTGLoader wrapperClassName="h-full" />
        ) : (
          <div className="flex h-full flex-col">
            <div className="mb-5 flex-1 px-4">
              <SelectFilter
                label="Configuration"
                placeholder="Select"
                triggerClassName="mb-4"
                options={configurations}
                filterKey={FILTER_KEY.CONFIGURATIONS}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="HTTP Method"
                placeholder="Select"
                triggerClassName="mb-4"
                options={METHOD_OPTIONS}
                filterKey={FILTER_KEY.METHOD}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="Status Code"
                placeholder="Select"
                triggerClassName="mb-4"
                options={STATUS_OPTIONS}
                filterKey={FILTER_KEY.STATUS}
                filters={slideoverFilters}
                setFilters={setSlideoverFilters}
              />
              <SelectFilter
                label="Integration"
                placeholder="Select"
                triggerClassName="mb-4"
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
            <INTGSlideoverFooter
              wrapperClassName="bg-white"
              isBorder="true"
              position="right"
            >
              <INTGButton
                data-test-id="cancel-filters-slideover"
                variant="primary"
                colors="white"
                onClick={handleCancelFilters}
              >
                Cancel
              </INTGButton>
              <INTGButton
                onClick={handleApplyFilters}
                data-test-id="apply-filters-slideover"
              >
                Apply
              </INTGButton>
            </INTGSlideoverFooter>
          </div>
        )}
      </INTGSlideoverBody>
    </INTGSlideover>
  );
};

export default FilterSlideover;
