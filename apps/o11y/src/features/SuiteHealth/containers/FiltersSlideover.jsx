import React, { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import FilterSlideoverBody from '../components/FilterSlideoverBody';
import { getSnPTestFilterByKey } from '../slices/selectors';

const FiltersSlideover = memo(
  ({ isVisible, onClose, onApplyFilter, allBuildNames }) => {
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
      setFilters({
        buildNames: appliedBuildNames.map((build) => ({
          label: build,
          value: build
        })),
        isMuted,
        isFlaky
      });
    }, [isMuted, isFlaky, appliedBuildNames]);

    const handleApplyFilter = () => {
      onApplyFilter({
        ...filters,
        buildNames: filters.buildNames.map((build) => build.value)
      });
    };

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
      <O11ySlideover
        show={isVisible}
        backgroundOverlay={false}
        size="sm"
        closeButtonOutside={false}
      >
        <O11ySlideoverHeader
          heading="Filters"
          headingWrapperClassName="text-base-900 text-lg font-medium leading-7"
          handleDismissClick={handleClose}
          backgroundColorClass="pb-0"
        />
        <O11ySlideoverBody wrapperClassName="px-6 pb-0 border-b border-base-200">
          <FilterSlideoverBody
            allBuildNames={allBuildNames}
            filters={filters}
            setFilters={setFilters}
          />
        </O11ySlideoverBody>
        <O11ySlideoverFooter>
          <div className="flex w-full items-center justify-end gap-4 py-1">
            <O11yButton colors="white" onClick={handleClose}>
              Cancel
            </O11yButton>
            <O11yButton onClick={handleApplyFilter}>Apply</O11yButton>
          </div>
        </O11ySlideoverFooter>
      </O11ySlideover>
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
