import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { O11Y_DATE_RANGE } from 'constants/common';
import {
  DatePickerFilterField,
  FilterPills,
  FilterSlideover,
  FilterSlideoverTrigger,
  FolderFilterField,
  MultiSelectCheckboxFilterField,
  MultiSelectSearchFilterField,
  MultiSelectStaticFilterField,
  SearchFilterField,
  SingleSelectCheckboxFilterField
} from 'features/FilterSkeleton';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import {
  getSnPTestsFiltersData,
  getTestsBuildNamesData,
  getTestsBuildTagsData,
  getTestsHostNamesData,
  getTestsTestTagsData
} from 'features/SuiteHealth/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';

const SUPPORTED_DATE_RANGE_KEYS = [
  O11Y_DATE_RANGE.days7.key,
  O11Y_DATE_RANGE.days30.key,
  O11Y_DATE_RANGE.months2.key,
  O11Y_DATE_RANGE.custom.key
];

const SHTestsFilters = ({ o11ySHTestsInteraction }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const activeProject = useSelector(getActiveProject);
  const [showSlideOver, setShowSlideOver] = useState(false);

  const getFilters = useCallback(() => {
    dispatch(
      getSnPTestsFiltersData({
        normalisedName: activeProject?.normalisedName
      })
    );
  }, [activeProject?.normalisedName, dispatch]);

  useEffect(() => {
    getFilters();
  }, [getFilters]);

  const handleTriggerClick = () => {
    setShowSlideOver(!showSlideOver);
  };

  const handleApply = useCallback(() => {
    o11ySHTestsInteraction('filter_applied');
    setShowSlideOver(false);
  }, [o11ySHTestsInteraction]);

  const handleClose = useCallback(() => {
    setShowSlideOver(false);
  }, []);

  const handleSearch = useCallback(() => {
    o11ySHTestsInteraction('search_applied');
  }, [o11ySHTestsInteraction]);

  const handleDateRangeChange = useCallback(
    (type, bounds) => {
      o11ySHTestsInteraction('datetime_filter_applied');
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.set('daterangetype', type);
      if (type === 'custom') {
        searchParams.set(
          'dateRange',
          `${bounds.lowerBound},${bounds.upperBound}`
        );
      }
      navigate({ search: searchParams.toString() }, { replace: true });
      getFilters();
    },
    [getFilters, navigate, o11ySHTestsInteraction]
  );

  return (
    <div>
      <div className="flex items-center justify-between">
        <SearchFilterField
          type={ADV_FILTER_TYPES.search.key}
          id="search-by-test-or-file-path"
          placeholder="Search by Test name or File path"
          onSearch={handleSearch}
        />
        <div className="flex items-center gap-5">
          <DatePickerFilterField
            supportedKeys={SUPPORTED_DATE_RANGE_KEYS}
            onDateRangeChange={handleDateRangeChange}
          />
          <FilterSlideoverTrigger onClick={handleTriggerClick} />
        </div>
      </div>
      <FilterPills />
      <FilterSlideover
        show={showSlideOver}
        onClose={handleClose}
        onApply={handleApply}
      >
        <div className="mb-6 flex flex-col gap-6">
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.uniqueBuildNames.key}
            placeholder="Select"
            label="Unique Build Name"
            searchAPI={getTestsBuildNamesData}
          />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.buildTags.key}
            placeholder="Select"
            label="Build Tags"
            searchAPI={getTestsBuildTagsData}
          />
          <FolderFilterField label="File Directory" />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.testTags.key}
            placeholder="Select"
            label="Test Tags"
            searchAPI={getTestsTestTagsData}
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
            label="Muted Tests"
            yesLabel="Muted"
            noLabel="Unmuted"
            type={ADV_FILTER_TYPES.isMuted.key}
          />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.hostNames.key}
            placeholder="Select"
            label="Host"
            searchAPI={getTestsHostNamesData}
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
            label="Failure Categories"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.jiraStatus.key}
            placeholder="Select"
            label="Defect Status (Jira Issues)"
          />
        </div>
      </FilterSlideover>
    </div>
  );
};

SHTestsFilters.propTypes = {
  o11ySHTestsInteraction: PropTypes.func.isRequired
};

export default SHTestsFilters;
