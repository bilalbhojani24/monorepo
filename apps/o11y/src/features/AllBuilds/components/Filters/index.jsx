import React, { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yComboBox,
  O11ySingleDatePicker,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { getISOParsedDate } from 'utils/dateTime';
import { capitalizeFirstLetter } from 'utils/stringUtils';

import {
  cancelSelectedFilters,
  setAppliedFilters,
  setSelectedFilters
} from '../../slices/dataSlice';
import { getSelectedFilters, getStaticFilters } from '../../slices/selectors';

import TagsFilters from './TagsFilter';
import UsersFilters from './UsersFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);
  const selectedFilters = useSelector(getSelectedFilters);
  const staticFilters = useSelector(getStaticFilters);
  const { statuses, users, tags, dateRange, frameworks } = selectedFilters;

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };
  const onCancelSelectedFilters = () => {
    dispatch(cancelSelectedFilters());
    hideSlideover();
  };
  const onApplyFilterClick = () => {
    dispatch(
      setAppliedFilters({
        statuses,
        users,
        tags,
        dateRange,
        frameworks
      })
    );
    hideSlideover();
  };
  const onChangeArrayFilter = (selectedValues, targetFilterName) => {
    dispatch(
      setSelectedFilters({
        [targetFilterName]: selectedValues.map((el) => el.value)
      })
    );
  };

  const onChangeDate = (dateObj, targetBound) => {
    try {
      const dateString = dateObj.toString();
      const date = new Date(dateString);
      dispatch(
        setSelectedFilters({
          dateRange: {
            lowerBound:
              targetBound === 'lowerBound'
                ? date.getTime()
                : dateRange.lowerBound,
            upperBound:
              targetBound === 'upperBound'
                ? new Date(date.setUTCHours(23, 59, 59, 999)).getTime()
                : dateRange.upperBound
          }
        })
      );
    } catch (err) {
      // clear value if invalid entered by user
      dispatch(
        setSelectedFilters({
          dateRange: {
            lowerBound:
              targetBound === 'lowerBound' ? '' : dateRange.lowerBound,
            upperBound: targetBound === 'upperBound' ? '' : dateRange.upperBound
          }
        })
      );
    }
  };

  const isValid = useMemo(
    () =>
      !(
        (dateRange.lowerBound && !dateRange.upperBound) ||
        (dateRange.upperBound && !dateRange.lowerBound) ||
        dateRange.lowerBound > dateRange.upperBound
      ),
    [dateRange.lowerBound, dateRange.upperBound]
  );

  const statusOptions = staticFilters?.statuses
    ? Object.values(staticFilters?.statuses).map((el) => ({
        value: el,
        label: capitalizeFirstLetter(el)
      }))
    : [];

  const frameworkOptions = staticFilters?.frameworks
    ? Object.values(staticFilters?.frameworks).map((el) => ({
        value: el,
        label: el
      }))
    : [];

  return (
    <>
      <O11ySlideover
        size="sm"
        show={isSlideoverVisible}
        backgroundOverlay={false}
        onEscPress={onCancelSelectedFilters}
      >
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={onCancelSelectedFilters}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          {staticFilters?.statuses ? (
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
          )}
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
