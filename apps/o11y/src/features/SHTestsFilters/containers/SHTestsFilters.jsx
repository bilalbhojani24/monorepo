import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterSkeleton from 'features/FilterSkeleton';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import {
  getBuildTagsData,
  getSnPTestsFiltersData
} from 'features/SuiteHealth/slices/dataSlice';
import { getBuildNamesData } from 'features/SuiteHealth/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';

import MultiSelectCheckboxFilter from '../components/MultiSelectCheckboxFilter';
import MultiSelectSearchFilter from '../components/MultiSelectSearchFilter';
import MultiSelectStaticFilter from '../components/MultiSelectStaticFilter';
import SingleSelectCheckboxFilter from '../components/SingleSelectCheckboxFilter';

const SHTestsFilters = () => {
  const dispatch = useDispatch();
  const activeProject = useSelector(getActiveProject);
  useEffect(() => {
    dispatch(
      getSnPTestsFiltersData({
        normalisedName: activeProject?.normalisedName
      })
    );
  }, [activeProject?.normalisedName, dispatch]);
  return (
    <FilterSkeleton>
      <div className="mb-6 flex flex-col gap-6">
        <MultiSelectSearchFilter
          type={ADV_FILTER_TYPES.buildTags.key}
          placeholder="Select"
          label="Build Tags"
          searchAPI={getBuildTagsData}
        />
        <MultiSelectSearchFilter
          type={ADV_FILTER_TYPES.uniqueBuildNames.key}
          placeholder="Select"
          label="Unique BuildNames"
          searchAPI={getBuildNamesData}
        />
        <MultiSelectCheckboxFilter
          id={ADV_FILTER_TYPES.isFlaky.key}
          label="Flaky Tests"
          yesLabel="Flaky"
          noLabel="Not Flaky"
          type={ADV_FILTER_TYPES.isFlaky.key}
        />
        <MultiSelectCheckboxFilter
          id={ADV_FILTER_TYPES.isAlwaysFailing.key}
          label="Always Failing Tests"
          yesLabel="Always Failing"
          noLabel="Not Always Failing"
          type={ADV_FILTER_TYPES.isAlwaysFailing.key}
        />
        <SingleSelectCheckboxFilter
          id={ADV_FILTER_TYPES.isNewFailure.key}
          label="Newly Failed Tests"
          inputLabel="Newly Failed Tests"
          type={ADV_FILTER_TYPES.isNewFailure.key}
        />
        <MultiSelectCheckboxFilter
          id={ADV_FILTER_TYPES.hasJiraDefects.key}
          label="Defects (JIRA Issues)"
          yesLabel="Tests with associated defects"
          noLabel="Tests with no associated defects"
          type={ADV_FILTER_TYPES.hasJiraDefects.key}
        />
        <MultiSelectCheckboxFilter
          id={ADV_FILTER_TYPES.isMuted.key}
          label="Muted Tests"
          yesLabel="Muted"
          noLabel="Unmuted"
          type={ADV_FILTER_TYPES.isMuted.key}
        />
        <MultiSelectStaticFilter
          type={ADV_FILTER_TYPES.failureCategories.key}
          placeholder="Select"
          label="Failure categories"
        />
        <MultiSelectStaticFilter
          type={ADV_FILTER_TYPES.os.key}
          placeholder="Select"
          label="OS"
        />
        <MultiSelectStaticFilter
          type={ADV_FILTER_TYPES.browser.key}
          placeholder="Select"
          label="Browser"
        />
        <MultiSelectStaticFilter
          type={ADV_FILTER_TYPES.device.key}
          placeholder="Select"
          label="Device"
        />
      </div>
    </FilterSkeleton>
  );
};

SHTestsFilters.propTypes = {};

export default SHTestsFilters;
