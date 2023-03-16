import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

import {
  getBuildsData,
  setAppliedFilters,
  setSelectedFilters
} from '../slices/dataSlice';
import { getAppliedFilters } from '../slices/selectors';

import useFetchUser from './Filters/useFetchUser';

const FilterBadge = ({ text, onClose }) => (
  <O11yBadge
    hasDot={false}
    hasRemoveButton
    modifier="base"
    text={text}
    onClose={onClose}
    wrapperClassName="bg-base-50 text-base-900 hover:line-through font-bold"
  />
);

const FilterTags = ({ viewAllBuilds }) => {
  const { projectNormalisedName } = useParams();
  const dispatch = useDispatch();
  const appliedFilters = useSelector(getAppliedFilters);
  const allUsersData = useFetchUser(true);

  const removeFilter = (filterCategory, targetValue) => {
    if (filterCategory === 'searchText') {
      dispatch(setSelectedFilters({ searchText: '' }));
      dispatch(setAppliedFilters({ searchText: '' }));
    }
    if (filterCategory === 'dateRange') {
      const newDateRange = {
        upperBound: '',
        lowerBound: ''
      };
      dispatch(setSelectedFilters({ dateRange: newDateRange }));
      dispatch(setAppliedFilters({ dateRange: newDateRange }));
    }
    if (['tags', 'users', 'statuses'].includes(filterCategory)) {
      dispatch(
        setSelectedFilters({
          [filterCategory]: appliedFilters[filterCategory].filter(
            (el) => el !== targetValue
          )
        })
      );
      dispatch(
        setAppliedFilters({
          [filterCategory]: appliedFilters[filterCategory].filter(
            (el) => el !== targetValue
          )
        })
      );
    }
    dispatch(
      getBuildsData({
        projectNormalisedName,
        currentPagingParams: {}
      })
    );
  };

  const itemsArray = Object.keys(appliedFilters)
    .map((singleFilterType) => {
      const targetValue = appliedFilters[singleFilterType];
      if (
        singleFilterType === 'dateRange' &&
        targetValue.lowerBound &&
        targetValue.upperBound
      ) {
        const startDate = getCustomTimeStamp({
          dateString: new Date(targetValue.lowerBound),
          withoutTZ: true,
          withoutTime: true
        });
        const endDate = getCustomTimeStamp({
          dateString: new Date(targetValue.upperBound),
          withoutTZ: true,
          withoutTime: true
        });
        return (
          <FilterBadge
            key={singleFilterType}
            text={`Date Range: ${startDate} - ${endDate}`}
            onClose={() => removeFilter(singleFilterType, '')}
          />
        );
      }
      if (['tags', 'users', 'statuses'].includes(singleFilterType)) {
        const statusName =
          singleFilterType === 'statuses' ? 'Status' : singleFilterType;
        return targetValue.map((singleTag) => {
          const singleTagName =
            singleFilterType === 'users'
              ? allUsersData.data?.filter(
                  (el) => el.id === parseInt(singleTag, 10)
                )[0]?.name
              : singleTag;
          return (
            <FilterBadge
              key={singleTag}
              text={`${capitalizeFirstLetter(statusName)} : ${singleTagName}`}
              onClose={() => removeFilter(singleFilterType, singleTag)}
            />
          );
        });
      }
      return null;
    })
    .filter((el) => el !== null && el.length !== 0);

  return (
    <>
      <div className="flex gap-x-4">
        {!!itemsArray.length && (
          <>
            <div className="border-base-300 my-auto h-5 border-l" />
            <p>Filters</p>
          </>
        )}
        {itemsArray}
        {!!itemsArray.length && (
          <O11yButton variant="minimal" colors="white" onClick={viewAllBuilds}>
            Clear All
          </O11yButton>
        )}
      </div>
    </>
  );
};

export default FilterTags;

FilterTags.propTypes = {
  viewAllBuilds: PropTypes.func.isRequired
};

FilterBadge.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
