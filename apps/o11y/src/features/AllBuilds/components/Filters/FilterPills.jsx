import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import { API_STATUSES } from 'constants/common';
import PropTypes from 'prop-types';
import { getCustomTimeStamp } from 'utils/dateTime';
import { capitalizeFirstLetter } from 'utils/stringUtils';

import { setAppliedFilters, setFiltersMetaData } from '../../slices/dataSlice';
import {
  getAllUsersDataFilters,
  getAppliedFilters
} from '../../slices/selectors';

import useBuildFilterDetails from './useBuildFilterDetails';

const FilterBadge = ({ text, onClose }) => (
  <O11yBadge
    hasDot={false}
    hasRemoveButton
    modifier="base"
    text={text}
    onClose={onClose}
    wrapperClassName="bg-base-50 text-base-900 font-bold bg-white ml-4"
  />
);

const FilterPills = ({ viewAllBuilds }) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(getAppliedFilters);
  const { filterDetailsApiStatus, filterDetailsData } = useBuildFilterDetails();
  const allUsersData = useSelector(getAllUsersDataFilters);
  const removeFilter = (filterCategory, targetValue) => {
    if (filterCategory === 'searchText') {
      dispatch(setAppliedFilters({ searchText: '' }));
    }
    if (filterCategory === 'dateRange') {
      const newDateRange = {
        upperBound: '',
        lowerBound: ''
      };
      dispatch(setAppliedFilters({ dateRange: newDateRange }));
    }
    if (['tags', 'users', 'statuses'].includes(filterCategory)) {
      dispatch(
        setAppliedFilters({
          [filterCategory]: appliedFilters[filterCategory].filter(
            (el) => el !== targetValue
          )
        })
      );
    }
  };

  useEffect(() => {
    dispatch(
      setFiltersMetaData({
        staticFilters: filterDetailsData?.staticFilters || []
      })
    );
  }, [dispatch, filterDetailsData]);

  const getUserNameById = (userId) => {
    let refreshData = filterDetailsData?.applied?.users?.filter(
      (el) => el.id === parseInt(userId, 10)
    )[0]?.name;
    if (!refreshData) {
      refreshData = allUsersData?.filter(
        (el) => el.id === parseInt(userId, 10)
      )[0]?.name;
    }
    return refreshData;
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
              ? getUserNameById(singleTag)
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
      {filterDetailsApiStatus === API_STATUSES.FULFILLED && (
        <div className="flex items-baseline">
          {!!itemsArray.length && (
            <div className="inline-flex gap-4">
              <p className="text-base-500 text-sm">Filters</p>
              <div className="border-base-300 my-auto h-5 border-l" />
            </div>
          )}
          <div className="block">
            {itemsArray}
            {!!itemsArray.length && (
              <O11yButton
                variant="minimal"
                colors="white"
                wrapperClassName="ml-4"
                onClick={viewAllBuilds}
              >
                Clear All
              </O11yButton>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FilterPills;

FilterPills.propTypes = {
  viewAllBuilds: PropTypes.func.isRequired
};

FilterBadge.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
