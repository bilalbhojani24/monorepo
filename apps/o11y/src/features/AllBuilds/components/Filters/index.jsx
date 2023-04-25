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
import {
  discardUnAppliedFilters,
  setSelectedFilterAsApplied
} from 'features/AllBuilds/slices/buildsSlice';

import BuildFrameworkFilter from './BuildFrameworkFilter';
import BuildStatusFilter from './BuildStatusFilter';
import DateRangeFilter from './DateRangeFilter';
import TagsFilters from './TagsFilter';
import UsersFilters from './UsersFilter';

const Filters = () => {
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
    dispatch(setSelectedFilterAsApplied());
    hideSlideover();
  };

  const setValidStatus = useCallback((status) => {
    setIsValid(status);
  }, []);
  return (
    <>
      <O11ySlideover
        size="md"
        show={isSlideoverVisible}
        backgroundOverlay={false}
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

export default Filters;
