import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { O11yBadge, O11yButton } from 'common/bifrostProxy';
import { EMPTY_STATIC_FILTERS } from 'features/TestList/constants';
import { getAppliedFilters } from 'features/TestList/slices/selectors';
import { setAppliedFilters } from 'features/TestList/slices/testListSlice';
import startCase from 'lodash/startCase';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from 'utils/stringUtils';

const FilterBadge = ({ text, onClose }) => (
  <O11yBadge
    hasDot={false}
    hasRemoveButton
    modifier="base"
    text={
      text.length > 40
        ? `...${text.substring(text.length - 40, text.length)}`
        : text
    }
    onClose={onClose}
    wrapperClassName="bg-white font-medium"
  />
);

// eslint-disable-next-line sonarjs/cognitive-complexity
const FilterPills = ({ viewAllBuilds }) => {
  const dispatch = useDispatch();
  const appliedFilters = useSelector(getAppliedFilters);

  const removeFilter = (filterCategory, targetValue) => {
    if (filterCategory === 'isMuted') {
      dispatch(setAppliedFilters({ isMuted: false }));
    }
    if (filterCategory === 'flaky' || filterCategory === 'history') {
      dispatch(setAppliedFilters({ [filterCategory]: [] }));
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
            text="Muted"
            onClose={() => removeFilter(singleFilterType, targetValue)}
          />
        );
      }
      if (singleFilterType === 'flaky' && targetValue.length) {
        return (
          <FilterBadge
            key={singleFilterType}
            text={targetValue[0] === 'false' ? 'Not Flaky' : 'Flaky'}
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
            text={`${capitalizeFirstLetter(
              singleFilterType
            )} : ${transformedValue}`}
            onClose={() => removeFilter(singleFilterType, targetValue[0])}
          />
        );
      }
      if (Object.keys(EMPTY_STATIC_FILTERS).includes(singleFilterType)) {
        return targetValue.map((singleTag) => (
          <FilterBadge
            key={singleTag}
            text={`${capitalizeFirstLetter(singleFilterType)} : ${singleTag}`}
            onClose={() => removeFilter(singleFilterType, singleTag)}
          />
        ));
      }
      return null;
    })
    .filter((el) => el !== null && el.length !== 0);

  return itemsArray.length ? (
    <div className="bg-base-100 px-8 py-4">
      <div className="flex gap-x-4">
        {!!itemsArray.length && (
          <>
            <p className="text-base-500 text-sm">Filters</p>
            <div className="border-base-300 my-auto h-5 border-l" />
          </>
        )}
        <div className="flex flex-wrap gap-4">
          {itemsArray}
          <O11yButton variant="minimal" colors="white" onClick={viewAllBuilds}>
            Clear All
          </O11yButton>
        </div>
      </div>
    </div>
  ) : null;
};

export default FilterPills;

FilterPills.propTypes = {
  viewAllBuilds: PropTypes.func.isRequired
};

FilterBadge.propTypes = {
  text: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};
