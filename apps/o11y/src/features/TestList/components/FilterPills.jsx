import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import StatusBadges from 'common/StatusBadges';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import {
  EMPTY_STATIC_FILTERS,
  FILTER_TAGNAME_MAPPING
} from 'features/TestList/constants';
import {
  getAggregatedStatus,
  getAppliedFilters
} from 'features/TestList/slices/selectors';
import { setAppliedFilters } from 'features/TestList/slices/testListSlice';
import { getActiveProject } from 'globalSlice/selectors';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';
import { capitalizeFirstLetter } from 'utils/stringUtils';

const truncateMax = (text) => {
  const MAX_CHARACTERS = 20;
  return text.length > MAX_CHARACTERS
    ? `...${text.substring(text.length - MAX_CHARACTERS, text.length)}`
    : text;
};

const FilterBadge = ({ text, onClose }) => (
  <O11yBadge
    hasDot={false}
    hasRemoveButton
    modifier="base"
    text={text}
    onClose={onClose}
    wrapperClassName="bg-base-200"
  />
);

// eslint-disable-next-line sonarjs/cognitive-complexity
const FilterPills = ({ viewAllTests }) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(getAppliedFilters);
  const aggregatedStatus = useSelector(getAggregatedStatus);
  const buildMeta = useSelector(getBuildMeta);
  const activeProject = useSelector(getActiveProject);

  const handleClickStatusBadge = useCallback(
    ({ itemClicked }) => {
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
      // apply directly
      dispatch(
        setAppliedFilters({
          status: [itemClicked]
        })
      );
    },
    [
      activeProject.id,
      activeProject.name,
      buildMeta.data?.name,
      buildMeta.data?.uuid,
      dispatch
    ]
  );

  const removeFilter = (filterCategory, targetValue) => {
    if (filterCategory === 'isMuted') {
      dispatch(setAppliedFilters({ isMuted: false }));
    }
    if (filterCategory === 'flaky' || filterCategory === 'history') {
      dispatch(setAppliedFilters({ [filterCategory]: [] }));
    }
    if (filterCategory === 'issueTypeGroup' || filterCategory === 'run') {
      dispatch(setAppliedFilters({ [filterCategory]: '' }));
    }
    if (Object.keys(EMPTY_STATIC_FILTERS).includes(filterCategory)) {
      dispatch(
        setAppliedFilters({
          [filterCategory]: appliedFilters[filterCategory].filter(
            (el) => el !== targetValue
          )
        })
      );
    }
  };

  const itemsArray = Object.keys(appliedFilters)
    .map((singleFilterType) => {
      const targetValue = appliedFilters[singleFilterType];
      if (singleFilterType === 'isMuted' && targetValue) {
        return (
          <FilterBadge
            key={singleFilterType}
            text={`${FILTER_TAGNAME_MAPPING.isMuted}${truncateMax(
              targetValue
            )}`}
            onClose={() => removeFilter(singleFilterType, targetValue)}
          />
        );
      }
      if (singleFilterType === 'flaky' && targetValue.length) {
        return (
          <FilterBadge
            key={singleFilterType}
            text={`${FILTER_TAGNAME_MAPPING.flaky}${truncateMax(targetValue)}`}
            onClose={() => removeFilter(singleFilterType, targetValue[0])}
          />
        );
      }
      if (singleFilterType === 'history' && targetValue.length) {
        let transformedValue = startCase(targetValue[0]).split(' ');
        transformedValue.shift();
        transformedValue = transformedValue.join(' ');
        return (
          <FilterBadge
            key={singleFilterType}
            text={`${FILTER_TAGNAME_MAPPING.history}${truncateMax(
              transformedValue
            )}`}
            onClose={() => removeFilter(singleFilterType, targetValue[0])}
          />
        );
      }
      if (
        (singleFilterType === 'issueTypeGroup' || singleFilterType === 'run') &&
        targetValue.length
      ) {
        return (
          <FilterBadge
            key={FILTER_TAGNAME_MAPPING[singleFilterType]}
            text={`${FILTER_TAGNAME_MAPPING[singleFilterType]}${truncateMax(
              targetValue
            )}`}
            onClose={() => removeFilter(singleFilterType, targetValue)}
          />
        );
      }
      if (Object.keys(EMPTY_STATIC_FILTERS).includes(singleFilterType)) {
        return targetValue.map((singleTag) => (
          <FilterBadge
            key={singleTag}
            text={`${
              FILTER_TAGNAME_MAPPING[singleFilterType] ||
              `${capitalizeFirstLetter(singleFilterType)}: `
            }${truncateMax(singleTag)}`}
            onClose={() => removeFilter(singleFilterType, singleTag)}
          />
        ));
      }
      return null;
    })
    .filter((el) => el !== null && el.length !== 0);

  return itemsArray.length ? (
    <div className="bg-base-100 flex items-center justify-between gap-2 py-4 pl-8 pr-6">
      <div className="flex items-center gap-x-4">
        <div className="border-base-300 flex items-center self-stretch border-r pr-2">
          <p className="text-base-500 text-sm">Filters</p>
        </div>
        <div className="flex flex-wrap gap-4">
          {itemsArray}
          <O11yButton variant="minimal" colors="white" onClick={viewAllTests}>
            Clear All
          </O11yButton>
        </div>
      </div>
      {aggregatedStatus && (
        <StatusBadges
          statusStats={aggregatedStatus}
          onClickHandler={handleClickStatusBadge}
        />
      )}
    </div>
  ) : null;
};

export default FilterPills;

FilterPills.propTypes = {
  viewAllTests: PropTypes.func.isRequired
};

FilterBadge.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
