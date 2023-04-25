import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import { getUnAppliedSelectedFilters } from 'features/AllBuilds/slices/buildsSelectors';
import {
  discardUnAppliedFilters,
  setSelectedFilterAsApplied
} from 'features/AllBuilds/slices/buildsSlice';

import BuildFrameworkFilter from './BuildFrameworkFilter';
import BuildStatusFilter from './BuildStatusFilter';
import DateRangeFilter from './DateRangeFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const unAppliedFilters = useSelector(getUnAppliedSelectedFilters);
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);

  const [isValid, setIsValid] = useState(true);

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };
  const onCancelSelectedFilters = () => {
    dispatch(discardUnAppliedFilters());
    hideSlideover();
  };
  const onApplyFilterClick = () => {
    if (unAppliedFilters.length) {
      dispatch(setSelectedFilterAsApplied());
    }
    hideSlideover();
  };

  const setValidStatus = useCallback((status) => {
    setIsValid(status);
  }, []);
  return (
    <>
      <O11ySlideover
        size="md"
        show={isSlideoverVisible}
        backgroundOverlay={false}
      >
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={onCancelSelectedFilters}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          {isSlideoverVisible && (
            <div className="flex flex-col gap-6 px-4">
              <BuildStatusFilter />
              <BuildFrameworkFilter />
              <DateRangeFilter setValidStatus={setValidStatus} />
            </div>
          )}
          {/* {staticFilters?.statuses ? (
            <div className="flex flex-col gap-6 px-4">
              <O11yComboBox
                isMulti
                placeholder="Select build status"
                label="Build Status"
                options={statusOptions}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'statuses');
                }}
                value={statusOptions.filter((el) =>
                  statuses.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
              />
              <UsersFilters
                onChangeArrayFilter={onChangeArrayFilter}
                allowFetchingData={isSlideoverVisible}
              />
              <TagsFilters
                onChangeArrayFilter={onChangeArrayFilter}
                allowFetchingData={isSlideoverVisible}
              />
              <O11yComboBox
                isMulti
                placeholder="Select framework"
                label="Frameworks"
                options={frameworkOptions}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'frameworks');
                }}
                value={frameworkOptions.filter((el) =>
                  frameworks.includes(el.value)
                )}
                checkPosition="right"
                virtuosoWidth="350px"
              />
              <div className="flex flex-col">
                <O11ySingleDatePicker
                  label="Start Date"
                  value={
                    dateRange.lowerBound
                      ? getISOParsedDate(dateRange.lowerBound)
                      : null
                  }
                  onChange={(dateObj) => onChangeDate(dateObj, 'lowerBound')}
                />
                {!dateRange.lowerBound && dateRange.upperBound && (
                  <p className="text-danger-600 text-sm">
                    Please select start date to apply date filter else remove
                    end date field
                  </p>
                )}
              </div>
              <div className="flex flex-col">
                <O11ySingleDatePicker
                  label="End Date"
                  value={
                    dateRange.upperBound
                      ? getISOParsedDate(dateRange.upperBound)
                      : null
                  }
                  onChange={(dateObj) => onChangeDate(dateObj, 'upperBound')}
                />
                {!dateRange.upperBound && dateRange.lowerBound && (
                  <p className="text-danger-600 text-sm">
                    Please select end date to apply date filter else remove
                    start date field
                  </p>
                )}
                {dateRange.upperBound &&
                  dateRange.lowerBound &&
                  dateRange.upperBound < dateRange.lowerBound && (
                    <p className="text-danger-600 text-sm">
                      End date cannot be smaller than start date
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <O11yLoader loaderClass="h-8 w-8 self-center p-1" />
          )} */}
        </O11ySlideoverBody>

        <O11ySlideoverFooter isBorder="true" position="right">
          <O11yButton
            variant="primary"
            colors="white"
            onClick={onCancelSelectedFilters}
          >
            Cancel
          </O11yButton>
          <O11yButton disabled={!isValid} onClick={onApplyFilterClick}>
            Apply
          </O11yButton>
        </O11ySlideoverFooter>
      </O11ySlideover>
      <O11yButton
        variant="primary"
        colors="white"
        wrapperClassName="rounded"
        icon={<MdFilterAlt className="text-base-500 h-5 w-5" />}
        onClick={showSlideover}
      >
        Filters
      </O11yButton>
    </>
  );
};

export default Filters;
