/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
  SearchIcon
} from 'assets/icons';
import { TMButton, TMCheckBox, TMInputField } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import useFilter from './useFilter';
import useTestCases from './useTestCases';

const Filter = ({ onCancel }) => {
  const { initFormValues } = useTestCases();
  const {
    ownersFilteredArray,
    tagsFilteredArray,
    filterSelections,
    filterChangeHandler,
    applyFilterHandler
  } = useFilter({ onCancel });

  useEffect(() => {
    initFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const priorityOptions = [
    {
      value: 'high',
      label: (
        <>
          <ArrowUpwardOutlinedIcon className="text-danger-500 mr-1" /> High
        </>
      )
    },
    {
      value: 'medium',
      label: (
        <>
          <RemoveOutlinedIcon className="text-brand-500 mr-1" /> Medium
        </>
      )
    },
    {
      value: 'low',
      label: (
        <>
          <ArrowDownwardOutlinedIcon className="text-success-500 mr-1" /> Low
        </>
      )
    },
    {
      value: 'critical',
      label: (
        <>
          <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-1" />{' '}
          Critical
        </>
      )
    }
  ];

  return (
    <div className="absolute top-full right-0 w-full rounded-md bg-white drop-shadow-lg">
      <div className="flex h-96 w-full gap-4 p-4 pb-1 pl-3">
        <div className="flex h-full w-5/12 flex-col">
          <div className="text-brand-800 mb-2 pl-1 text-base font-medium">
            Filter By Owner
          </div>
          <div className="pl-1">
            <TMInputField
              placeholder="Search"
              leadingIcon={<SearchIcon className="text-base-400" />}
            />
          </div>
          <div className="mt-4 h-full w-full overflow-y-auto pt-1 pl-1">
            {ownersFilteredArray.map((item) => (
              <TMCheckBox
                key={item.value}
                border={false}
                wrapperClass="pt-0 mb-2"
                checked={filterSelections?.owners?.includes(item.value)}
                data={item}
                onChange={() => filterChangeHandler('owners', item)}
              />
            ))}
          </div>
        </div>
        <div className="flex h-full w-5/12 flex-col">
          <div className="text-brand-800 mb-2 pl-1 text-base font-medium">
            Filter By Tags
          </div>
          <div className="pl-1">
            <TMInputField
              placeholder="Search tags by name"
              leadingIcon={<SearchIcon className="text-base-400" />}
            />
          </div>
          <div className="mt-4 h-full w-full overflow-y-auto pt-1 pl-1">
            {tagsFilteredArray.map((item) => (
              <TMCheckBox
                key={item.value}
                border={false}
                wrapperClass="pt-0 mb-2"
                checked={filterSelections?.tags?.includes(item.value)}
                data={item}
                onChange={() => filterChangeHandler('tags', item)}
              />
            ))}
          </div>
        </div>
        <div className="w-1/5">
          <div className="text-brand-800 mb-2 text-base font-medium">
            Filter By Priority
          </div>
          {priorityOptions.map((item) => (
            <TMCheckBox
              key={item.value}
              border={false}
              wrapperClass="pt-0 mb-2"
              checked={filterSelections?.priority?.includes(item.value)}
              data={item}
              onChange={() => filterChangeHandler('priority', item)}
            />
          ))}
        </div>
      </div>
      <div className="border-base-300 flex w-full justify-end gap-4 border-t p-4">
        <TMButton colors="white" onClick={onCancel}>
          Cancel
        </TMButton>
        <TMButton onClick={applyFilterHandler}>Apply Filters</TMButton>
      </div>
    </div>
  );
};

Filter.propTypes = {
  onCancel: PropTypes.func
};

Filter.defaultProps = {
  onCancel: () => {}
};

export default Filter;
