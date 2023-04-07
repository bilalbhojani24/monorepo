import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdFilterAlt } from '@browserstack/bifrost';
import {
  O11yButton,
  O11yComboBox,
  O11ySlideover,
  O11ySlideoverBody,
  O11ySlideoverFooter,
  O11ySlideoverHeader
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { getCustomTimeStamp } from 'utils/dateTime';
import { capitalizeFirstLetter } from 'utils/stringUtils';

import { setAppliedFilters, setSelectedFilters } from '../../slices/dataSlice';
import { getSelectedFilters, getStaticFilters } from '../../slices/selectors';

import TagsFilters from './TagsFilter';
import UsersFilters from './UsersFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);
  const selectedFilters = useSelector(getSelectedFilters);
  const staticFilters = useSelector(getStaticFilters);
  const { statuses, users, tags, dateRange } = selectedFilters;

  const showSlideover = () => {
    setIsSlideoverVisible(true);
  };
  const hideSlideover = () => {
    setIsSlideoverVisible(false);
  };
  const onApplyFilterClick = () => {
    dispatch(
      setAppliedFilters({
        statuses,
        users,
        tags,
        dateRange
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
  const onChangeUpperLowerBound = (e, targetBound) => {
    const newValue = new Date(e.target.value);
    dispatch(
      setSelectedFilters({
        dateRange: {
          lowerBound:
            targetBound === 'lowerBound'
              ? newValue.getTime()
              : dateRange.lowerBound,
          upperBound:
            targetBound === 'upperBound'
              ? new Date(newValue.setUTCHours(23, 59, 59, 999)).getTime()
              : dateRange.upperBound
        }
      })
    );
  };
  const statusOptions = staticFilters?.statuses
    ? Object.values(staticFilters?.statuses).map((el) => ({
        value: el,
        label: capitalizeFirstLetter(el)
      }))
    : [];

  return (
    <>
      <O11ySlideover
        size="sm"
        show={isSlideoverVisible}
        backgroundOverlay={false}
      >
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={hideSlideover}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          {staticFilters?.statuses ? (
            <div className="flex flex-col gap-6 px-4">
              <O11yComboBox
                isMulti
                placeholder="Select"
                label="Build Status"
                options={statusOptions}
                onChange={(selectedValues) => {
                  onChangeArrayFilter(selectedValues, 'statuses');
                }}
                value={statusOptions.filter((el) =>
                  statuses.includes(el.value)
                )}
                checkPosition
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
              <div>
                <label
                  className="text-base-700 text-sm"
                  htmlFor="start-date-filter"
                >
                  Start Date
                </label>
                <input
                  className="border-base-300 placeholder:text-base-200 block w-full rounded-md"
                  id="start-date-filter"
                  type="date"
                  value={
                    dateRange.lowerBound
                      ? getCustomTimeStamp({
                          dateString: new Date(dateRange.lowerBound),
                          withoutTZ: true,
                          withoutTime: true,
                          dateFormat: 'yyyy-MM-dd'
                        })
                      : '0000-00-00'
                  }
                  onChange={(e) => onChangeUpperLowerBound(e, 'lowerBound')}
                  placeholder="Start Date"
                />
              </div>
              <div>
                <label
                  className="text-base-700 text-sm"
                  htmlFor="end-date-filter"
                >
                  End Date
                </label>
                <input
                  className="border-base-300 placeholder:text-base-200 block w-full rounded-md"
                  id="end-date-filter"
                  value={
                    dateRange.upperBound
                      ? getCustomTimeStamp({
                          dateString: new Date(
                            dateRange.upperBound
                          ).setUTCHours(0, 0, 0, 0),
                          withoutTZ: true,
                          withoutTime: true,
                          dateFormat: 'yyyy-MM-dd'
                        })
                      : '0000-00-00'
                  }
                  onChange={(e) => onChangeUpperLowerBound(e, 'upperBound')}
                  type="date"
                  placeholder="End Date"
                />
              </div>
            </div>
          ) : (
            <O11yLoader loaderClass="h-8 w-8 self-center p-1" />
          )}
        </O11ySlideoverBody>

        <O11ySlideoverFooter isBorder="true" backgroundColorClass="justify-end">
          <O11yButton variant="primary" colors="white" onClick={hideSlideover}>
            Cancel
          </O11yButton>
          <O11yButton onClick={onApplyFilterClick}>Apply</O11yButton>
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
