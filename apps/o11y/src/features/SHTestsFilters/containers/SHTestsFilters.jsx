import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  FilterPills,
  FilterSlideover,
  FilterSlideoverTrigger
} from 'features/FilterSkeleton';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import {
  getBuildNamesData,
  getBuildTagsData,
  getHostNamesData,
  getSnPTestsFiltersData,
  getTestTagsData
} from 'features/SuiteHealth/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';

import FolderFilterField from '../components/FolderFilterField';
import MultiSelectCheckboxFilterField from '../components/MultiSelectCheckboxFilterField';
import MultiSelectSearchFilterField from '../components/MultiSelectSearchFilterField';
import MultiSelectStaticFilterField from '../components/MultiSelectStaticFilterField';
import SingleSelectCheckboxFilterField from '../components/SingleSelectCheckboxFilterField';

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
        <div>Search</div>
        <div className="flex items-center gap-5">
          <span>Date picker</span>
          <FilterSlideoverTrigger onClick={handleTriggerClick} />
        </div>
      </div>
      <FilterPills />
      <FilterSlideover show={showSlideOver} onClose={handleClose}>
        <div className="mb-6 flex flex-col gap-6">
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.uniqueBuildNames.key}
            placeholder="Select"
            label="Unique BuildNames"
            searchAPI={getBuildNamesData}
          />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.buildTags.key}
            placeholder="Select"
            label="Build Tags"
            searchAPI={getBuildTagsData}
          />
          <FolderFilterField />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.testTags.key}
            placeholder="Select"
            label="Test Tags"
            searchAPI={getTestTagsData}
          />
          <MultiSelectCheckboxFilterField
            id={ADV_FILTER_TYPES.isFlaky.key}
            label="Flaky Tests"
            yesLabel="Flaky"
            noLabel="Not Flaky"
            type={ADV_FILTER_TYPES.isFlaky.key}
          />
          <MultiSelectCheckboxFilterField
            id={ADV_FILTER_TYPES.isAlwaysFailing.key}
            label="Always Failing Tests"
            yesLabel="Always Failing"
            noLabel="Not Always Failing"
            type={ADV_FILTER_TYPES.isAlwaysFailing.key}
          />
          <SingleSelectCheckboxFilterField
            id={ADV_FILTER_TYPES.isNewFailure.key}
            label="Newly Failed Tests"
            inputLabel="Newly Failed Tests"
            type={ADV_FILTER_TYPES.isNewFailure.key}
          />
          <MultiSelectCheckboxFilterField
            id={ADV_FILTER_TYPES.hasJiraDefects.key}
            label="Defects (JIRA Issues)"
            yesLabel="Tests with associated defects"
            noLabel="Tests with no associated defects"
            type={ADV_FILTER_TYPES.hasJiraDefects.key}
          />
          <MultiSelectCheckboxFilterField
            id={ADV_FILTER_TYPES.isMuted.key}
            label="Muted Tests"
            yesLabel="Muted"
            noLabel="Unmuted"
            type={ADV_FILTER_TYPES.isMuted.key}
          />
          <MultiSelectSearchFilterField
            type={ADV_FILTER_TYPES.hostName.key}
            placeholder="Select"
            label="Host name"
            searchAPI={getHostNamesData}
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.device.key}
            placeholder="Select"
            label="Device"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.os.key}
            placeholder="Select"
            label="OS"
          />
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.browser.key}
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

export default SHTestsFilters;
