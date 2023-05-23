import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

const SUPPORTED_DATE_RANGE_KEYS = [
  O11Y_DATE_RANGE.days7.key,
  O11Y_DATE_RANGE.days15.key,
  O11Y_DATE_RANGE.days30.key,
  O11Y_DATE_RANGE.custom.key
];

const SHTestsFilters = () => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  const [showSlideOver, setShowSlideOver] = useState(false);
  useEffect(() => {
    dispatch(
      getSnPTestsFiltersData({
        normalisedName: activeProject?.normalisedName
      })
    );
  }, [activeProject?.normalisedName, dispatch]);

  const handleTriggerClick = () => {
    setShowSlideOver(!showSlideOver);
  };

  const handleClose = () => {
    setShowSlideOver(false);
  };
  return (
    <div>
      <div className="flex items-center justify-between">
        <SearchFilterField
          type={ADV_FILTER_TYPES.search.key}
          id="search-by-test-or-file-path"
          placeholder="Search by Test name or File path"
        />
        <div className="flex items-center gap-5">
          <DatePickerFilterField supportedKeys={SUPPORTED_DATE_RANGE_KEYS} />
          <FilterSlideoverTrigger onClick={handleTriggerClick} />
        </div>
      </div>
      <FilterPills />
      <FilterSlideover show={showSlideOver} onClose={handleClose}>
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
          {/* #TODO: to be added after the backend change is moved
          <MultiSelectCheckboxFilterField
            label="Defects (JIRA Issues)"
            yesLabel="Tests with associated defects"
            noLabel="Tests with no associated defects"
            type={ADV_FILTER_TYPES.hasJiraDefects.key}
          />
           */}
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
        </div>
      </FilterSlideover>
    </div>
  );
};

export default SHTestsFilters;
