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
import { TEST_STATUS } from 'constants/common';
import { capitalizeFirstLetter } from 'utils/common';
import { getCustomTimeStamp } from 'utils/dateTime';

import { setAppliedFilters, setSelectedFilters } from '../../slices/dataSlice';
import { getSelectedFilters } from '../../slices/selectors';

import TagsFilters from './TagsFilter';
import UsersFilters from './UsersFilter';

const Filters = () => {
  const dispatch = useDispatch();
  const [isSlideoverVisible, setIsSlideoverVisible] = useState(false);
  const selectedFilters = useSelector(getSelectedFilters);
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
    const newValue = new Date(e.target.value).getTime();
    dispatch(
      setSelectedFilters({
        dateRange: {
          lowerBound:
            targetBound === 'lowerBound' ? newValue : dateRange.lowerBound,
          upperBound:
            targetBound === 'upperBound' ? newValue : dateRange.upperBound
        }
      })
    );
  };
  const statusOptions = Object.values(TEST_STATUS).map((el) => ({
    value: el,
    label: capitalizeFirstLetter(el)
  }));

  return (
    <>
      <O11ySlideover show={isSlideoverVisible} backgroundOverlay={false}>
        <O11ySlideoverHeader
          heading="Filters"
          handleDismissClick={hideSlideover}
        />
        <O11ySlideoverBody wrapperClassName="overflow-auto">
          <div className="flex flex-col gap-6 px-4">
            <O11yComboBox
              isMulti
              placeholder="Select"
              label="Status"
              options={statusOptions}
              onChange={(selectedValues) => {
                onChangeArrayFilter(selectedValues, 'statuses');
              }}
              value={statusOptions.filter((el) => statuses.includes(el.value))}
              checkPosition
              virtuosoWidth="480px"
              optionsListWrapperClassName="min-w-max overflow-hidden"
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
                    : '00-00-0000'
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
                        dateString: new Date(dateRange.upperBound),
                        withoutTZ: true,
                        withoutTime: true,
                        dateFormat: 'yyyy-MM-dd'
                      })
                    : '00-00-0000'
                }
                onChange={(e) => onChangeUpperLowerBound(e, 'upperBound')}
                type="date"
                placeholder="End Date"
              />
            </div>
          </div>
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
        icon={<MdFilterAlt className="h-5 w-5" />}
        onClick={showSlideover}
      >
        Filters
      </O11yButton>
    </>
  );
};

export default Filters;
