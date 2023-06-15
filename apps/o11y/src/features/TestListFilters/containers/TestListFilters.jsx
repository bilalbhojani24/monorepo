import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MdUnfoldLess, MdUnfoldMore } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import StatusBadges from 'common/StatusBadges';
import { FLOATING_COMPONENTS_IDS } from 'constants/common';
import {
  FilterPills,
  FilterSlideover,
  FilterSlideoverTrigger,
  FolderFilterField,
  MultiSelectCheckboxFilterField,
  MultiSelectStaticFilterField,
  SearchFilterField,
  SingleSelectCheckboxFilterField
} from 'features/FilterSkeleton';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { useTestListContext } from 'features/TestList/context/TestListContext';
import { getTestListingFiltersData } from 'features/TestList/slices/filterSlice';
import { getAggregatedStatus } from 'features/TestList/slices/selectors';
import useFloatingComponentTracking from 'hooks/useFloatingComponentTracking';
import PropTypes from 'prop-types';

const TestListFilters = ({ buildUUID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const aggregatedStatus = useSelector(getAggregatedStatus);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const { expandAll, invertExpandAll, o11yTestListingInteraction } =
    useTestListContext();

  useEffect(() => {
    dispatch(getTestListingFiltersData({ buildId: buildUUID }));
  }, [buildUUID, dispatch]);

  const handleTriggerClick = () => {
    setShowSlideOver(!showSlideOver);
  };

  const handleApply = useCallback(() => {
    o11yTestListingInteraction('filter_applied');
    setShowSlideOver(false);
  }, [o11yTestListingInteraction]);

  const handleClose = useCallback(() => {
    setShowSlideOver(false);
  }, []);

  const handleSearch = useCallback(() => {
    o11yTestListingInteraction('search_applied');
  }, [o11yTestListingInteraction]);

  useFloatingComponentTracking(
    showSlideOver,
    FLOATING_COMPONENTS_IDS.TEST_FILTERS
  );

  const handleRemoveSingleFilter = (filterKey) => {
    if (filterKey === ADV_FILTER_TYPES.issueTypeGroup.key) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete(ADV_FILTER_TYPES.issueTypeGroup.key);
      navigate({ search: searchParams.toString() });
    }
  };

  const handleRemoveAll = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.delete(ADV_FILTER_TYPES.issueTypeGroup.key);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div>
      <div className="border-base-200 flex justify-between border-b bg-white px-6 py-4">
        <div className="flex w-full">
          <O11yButton
            isIconOnlyButton
            colors="white"
            variant="minimal"
            wrapperClassName="mr-2.5 p-0.5"
            icon={
              expandAll ? (
                <MdUnfoldLess className="h-5 w-5" />
              ) : (
                <MdUnfoldMore className="h-5 w-5" />
              )
            }
            onClick={invertExpandAll}
          />
          <SearchFilterField
            type={ADV_FILTER_TYPES.search.key}
            id="search-by-test-or-file-path"
            placeholder="Search by Test name or File path"
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center gap-5">
          <FilterSlideoverTrigger onClick={handleTriggerClick} />
        </div>
      </div>
      <FilterPills
        onRemoveSingleFilter={handleRemoveSingleFilter}
        onRemoveAll={handleRemoveAll}
        rightNode={
          <>
            {aggregatedStatus && (
              <StatusBadges statusStats={aggregatedStatus} />
            )}
          </>
        }
        wrapperClassName="bg-base-100 flex items-center justify-between gap-2 py-4 pl-8 pr-6 mt-0"
      />
      <FilterSlideover
        show={showSlideOver}
        onClose={handleClose}
        onApply={handleApply}
      >
        <div className="mb-6 flex flex-col gap-6">
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.runs.key}
            placeholder="Select"
            label="Re runs"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.ciBuildNumbers.key}
            placeholder="Select"
            label="CI Build Number"
          />
          <FolderFilterField />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.testTags.key}
            placeholder="Select"
            label="Test Tags"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.status.key}
            placeholder="Select"
            label="Test Status"
          />
          <MultiSelectCheckboxFilterField
            label="Flaky Tests"
            yesLabel="Flaky"
            noLabel="Not Flaky"
            type={ADV_FILTER_TYPES.isFlaky.key}
          />
          <MultiSelectCheckboxFilterField
            label="Always Failing Tests"
            yesLabel="Always Failing"
            noLabel="Not Always Failing"
            type={ADV_FILTER_TYPES.isAlwaysFailing.key}
          />
          <SingleSelectCheckboxFilterField
            label="Newly Failed Tests"
            inputLabel="Newly Failed Tests"
            type={ADV_FILTER_TYPES.isNewFailure.key}
          />
          <MultiSelectCheckboxFilterField
            label="Performance Anomalies"
            yesLabel="Performance Anomalies"
            noLabel="Not Performance Anomalies"
            type={ADV_FILTER_TYPES.hasPerformanceAnomaly.key}
          />
          <MultiSelectCheckboxFilterField
            label="Defects (JIRA Issues)"
            yesLabel="Tests with associated defects"
            noLabel="Tests with no associated defects"
            type={ADV_FILTER_TYPES.hasJiraDefects.key}
          />

          <MultiSelectCheckboxFilterField
            label="Muted Tests"
            yesLabel="Muted"
            noLabel="Unmuted"
            type={ADV_FILTER_TYPES.isMuted.key}
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.hostNames.key}
            placeholder="Select"
            label="Host name"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.deviceList.key}
            placeholder="Select"
            label="Device"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.osList.key}
            placeholder="Select"
            label="OS"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.browserList.key}
            placeholder="Select"
            label="Browser"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.failureCategories.key}
            placeholder="Select"
            label="Failure categories"
          />
        </div>
      </FilterSlideover>
    </div>
  );
};

TestListFilters.propTypes = {
  buildUUID: PropTypes.string.isRequired
};

export default TestListFilters;
