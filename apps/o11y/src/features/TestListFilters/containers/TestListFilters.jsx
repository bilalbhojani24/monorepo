import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdUnfoldLess, MdUnfoldMore } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import StatusBadges from 'common/StatusBadges';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import {
  FilterPills,
  FilterSlideover,
  FilterSlideoverTrigger,
  FolderFilterField,
  MultiSelectCheckboxFilterField,
  MultiSelectSearchFilterField,
  MultiSelectStaticFilterField,
  SearchFilterField
} from 'features/FilterSkeleton';
import { ADV_FILTER_TYPES } from 'features/FilterSkeleton/constants';
import { useTestListContext } from 'features/TestList/context/TestListContext';
import {
  getTestListHostNamesData,
  getTestListingFiltersData
} from 'features/TestList/slices/filterSlice';
import { getAggregatedStatus } from 'features/TestList/slices/selectors';
import { getActiveProject } from 'globalSlice/selectors';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

const TestListFilters = ({ buildUUID }) => {
  const dispatch = useDispatch();
  const aggregatedStatus = useSelector(getAggregatedStatus);
  const [showSlideOver, setShowSlideOver] = useState(false);
  const buildMeta = useSelector(getBuildMeta);
  const activeProject = useSelector(getActiveProject);
  const { expandAll, invertExpandAll } = useTestListContext();

  const handleClickStatusBadge = useCallback(
    ({ itemClicked }) => {
      /* #TODO confirm this log event */
      logOllyEvent({
        event: 'O11yBuildMetaHeaderInteracted',
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta.data?.name,
          build_uuid: buildMeta.data?.uuid,
          interaction: `${itemClicked}_clicked`
        }
      });
      const searchParams = new URLSearchParams(window?.location?.search);
      searchParams.set('status', itemClicked);
      // #TODO need to apply status directly from here
    },
    [
      activeProject.id,
      activeProject.name,
      buildMeta.data?.name,
      buildMeta.data?.uuid
    ]
  );

  useEffect(() => {
    dispatch(getTestListingFiltersData({ buildId: buildUUID }));
  }, [buildUUID, dispatch]);

  const handleTriggerClick = () => {
    setShowSlideOver(!showSlideOver);
  };

  const handleClose = () => {
    setShowSlideOver(false);
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
          />
        </div>
        <div className="flex items-center gap-5">
          <FilterSlideoverTrigger onClick={handleTriggerClick} />
        </div>
      </div>
      <FilterPills
        rightNode={
          <>
            {aggregatedStatus && (
              <StatusBadges
                statusStats={aggregatedStatus}
                onClickHandler={handleClickStatusBadge}
              />
            )}
          </>
        }
        wrapperClassName="bg-base-100 flex items-center justify-between gap-2 py-4 pl-8 pr-6"
      />
      <FilterSlideover show={showSlideOver} onClose={handleClose}>
        <div className="mb-6 flex flex-col gap-6">
          <MultiSelectStaticFilterField
            type={ADV_FILTER_TYPES.reRunsList.key}
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
          <MultiSelectCheckboxFilterField
            label="Performance Anomalies"
            yesLabel="Performance Anomalies"
            noLabel="Not Performance Anomalies"
            type={ADV_FILTER_TYPES.hasPerformanceAnomaly.key}
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
            label="Host name"
            searchAPI={getTestListHostNamesData}
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
