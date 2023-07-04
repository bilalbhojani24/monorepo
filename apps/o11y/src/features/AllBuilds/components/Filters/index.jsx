import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import { FLOATING_COMPONENTS_IDS } from 'constants/common';
import {
  discardUnAppliedFilters,
  setSelectedFilterAsApplied
} from 'features/AllBuilds/slices/buildsSlice';
import useFloatingComponentTracking from 'hooks/useFloatingComponentTracking';
import PropTypes from 'prop-types';

import ArchiveSwitchFilter from './ArchiveSwitchFilter';
import BuildFrameworkFilter from './BuildFrameworkFilter';
import BuildStatusFilter from './BuildStatusFilter';
import DateRangeFilter from './DateRangeFilter';
import TagsFilters from './TagsFilter';
import UsersFilters from './UsersFilter';

const Filters = ({ onApplyFilters }) => {
  const dispatch = useDispatch();
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };
  const onCancelSelectedFilters = () => {
    dispatch(discardUnAppliedFilters());
    hideSlideover();
  };
  const onApplyFilterClick = () => {
    onApplyFilters();
    dispatch(setSelectedFilterAsApplied());
    hideSlideover();
  };

  const setValidStatus = useCallback((status) => {
    setIsValid(status);
  }, []);
  useFloatingComponentTracking(
    isSlideoverVisible,
    FLOATING_COMPONENTS_IDS.BUILD_FILTERS
  );
  return (
    <>
      <O11ySlideover
        size="md"
        show={isSlideoverVisible}
        backgroundOverlay={false}
        onEscPress={onCancelSelectedFilters}
      >
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={onCancelSelectedFilters}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          {isSlideoverVisible && (
            <div className="flex flex-col gap-6 px-4">
              <BuildStatusFilter />
              <UsersFilters />
              <TagsFilters />
              <BuildFrameworkFilter />
              <DateRangeFilter setValidStatus={setValidStatus} />
              <ArchiveSwitchFilter />
            </div>
          )}
        </O11ySlideoverBody>

        <O11ySlideoverFooter isBorder="true" position="right">
          <O11yButton
            variant="primary"
            colors="white"
            onClick={onCancelSelectedFilters}
          >
            Cancel
          </O11yButton>
          <O11yButton disabled={!isValid} onClick={onApplyFilterClick}>
            Apply
          </O11yButton>
        </O11ySlideoverFooter>
      </O11ySlideover>
      <O11yButton
        variant="primary"
        colors="white"
        wrapperClassName="rounded"
        icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
        onClick={showSlideover}
      >
        Filters
      </O11yButton>
    </>
  );
};

Filters.propTypes = {
  onApplyFilters: PropTypes.func.isRequired
};

export default Filters;
