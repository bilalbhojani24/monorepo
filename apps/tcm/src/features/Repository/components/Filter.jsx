/* eslint-disable tailwindcss/no-arbitrary-value */
import React, { useEffect } from 'react';
import {
  ArrowDownwardOutlinedIcon,
  ArrowUpwardOutlinedIcon,
  CloseOutlinedIcon,
  FilterAltOutlinedIcon,
  KeyboardDoubleArrowUpOutlinedIcon,
  RemoveOutlinedIcon,
  SearchIcon
} from 'assets/icons';
import classNames from 'classnames';
import { TMButton, TMCheckBox, TMInputField } from 'common/bifrostProxy';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import { onSubmitKeyHandler } from 'utils/helperFunctions';

import useFilter from './useFilter';
import useTestCases from './useTestCases';

const Filter = ({ isMini, onFilterChange }) => {
  const { initFormValues } = useTestCases();
  const {
    filterBoxRef,
    appliedFiltersCount,
    // projectId,
    isFilterVisible,
    ownersFilteredArray,
    tagsFilteredArray,
    filterSearchMeta,
    tagSearchKey,
    ownerSearchKey,
    setOwnerSearchKey,
    setTagSearchKey,
    filterChangeHandler,
    applyFilterHandler,
    setFilter,
    searchChangeHandler,
    resetFilterAndSearch
  } = useFilter({ onFilterChange });

  useEffect(() => {
    if (isFilterVisible) initFormValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterVisible]);

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
    <div
      className={classNames(
        'border-base-300 relative z-10 flex w-full items-start border-b',
        {
          'h-12 flex items-center pr-1': isMini,
          'py-3  pr-3': !isMini
        }
      )}
    >
      <div className="w-full">
        <TMInputField
          placeholder="Search by Test Case name or Test Case ID"
          value={filterSearchMeta?.q}
          onChange={(e) => searchChangeHandler(e.currentTarget.value)}
          onKeyDown={(e) =>
            onSubmitKeyHandler(e, () => applyFilterHandler(), true)
          }
          leadingIcon={<SearchIcon className="text-base-400" />}
          isTrailingNodeClickable
          trailingIcon={
            <>
              {filterSearchMeta?.q ? (
                <CloseOutlinedIcon
                  onClick={() => resetFilterAndSearch(true)}
                  className="text-base-800 cursor-pointer"
                />
              ) : null}
            </>
          }
        />
      </div>
      <div className="isolate inline-flex rounded-md shadow-sm">
        <TMButton
          onClick={() => setFilter(!isFilterVisible)}
          // buttonType="half-rounded-button"
          wrapperClassName={classNames('ml-3 whitespace-nowrap w-full', {
            'rounded-tr-none rounded-br-none focus:ring-offset-0 focus:z-10':
              appliedFiltersCount
          })}
          size="default"
          variant={appliedFiltersCount ? 'secondary' : 'primary'}
          colors={appliedFiltersCount ? 'brand' : 'white'}
          icon={
            !appliedFiltersCount ? (
              <FilterAltOutlinedIcon className="!h-5 !w-5" />
            ) : null
          }
        >
          {appliedFiltersCount ? `Filters (${appliedFiltersCount})` : 'Filter'}
        </TMButton>
        {appliedFiltersCount ? (
          <TMButton
            onClick={() => resetFilterAndSearch()}
            buttonType="half-rounded-button"
            wrapperClassName="p-2 rounded-tl-none rounded-bl-none border-l-none focus:ring-offset-0"
            size="default"
            variant="primary"
            colors="white"
          >
            <CloseOutlinedIcon className="!h-5 !w-5" />
          </TMButton>
        ) : null}
      </div>
      {isFilterVisible && (
        <div
          className="absolute top-full right-0 w-full max-w-[calc(100%-2px)] rounded-md bg-white drop-shadow-lg"
          ref={filterBoxRef}
        >
          <div className="flex h-96 w-full gap-4 p-4 pb-1 pl-3">
            <div className="flex h-full w-5/12 flex-col">
              <div className="text-brand-800 mb-2 pl-1 text-base font-medium">
                Filter By Owner
              </div>
              <div className="pl-1">
                <TMInputField
                  placeholder="Search"
                  value={ownerSearchKey}
                  onChange={(e) => setOwnerSearchKey(e.currentTarget.value)}
                  leadingIcon={<SearchIcon className="text-base-400" />}
                />
              </div>
              <div className="mt-4 h-full w-full overflow-y-auto pt-1 pl-1">
                {ownersFilteredArray.length ? (
                  <p className="mb-3 text-xs font-medium">
                    RECENTLY ADDED USERS
                  </p>
                ) : null}
                {ownersFilteredArray.map((item) => (
                  <TMCheckBox
                    key={item.value}
                    border={false}
                    wrapperClassName="pt-0 mb-2"
                    checked={filterSearchMeta?.owner?.includes(`${item.value}`)}
                    data={item}
                    onChange={() => filterChangeHandler('owner', item)}
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
                  value={tagSearchKey}
                  onChange={(e) => setTagSearchKey(e.currentTarget.value)}
                  placeholder="Search tags by name"
                  leadingIcon={<SearchIcon className="text-base-400" />}
                />
              </div>
              <div className="mt-4 h-full w-full overflow-y-auto pt-1 pl-1">
                {tagsFilteredArray.length ? (
                  <p className="mb-3 text-xs font-medium">
                    RECENTLY ADDED TAGS
                  </p>
                ) : null}
                {tagsFilteredArray.map((item) => (
                  <TMCheckBox
                    key={item.value}
                    border={false}
                    wrapperClassName="pt-0 mb-2"
                    checked={filterSearchMeta?.tags?.includes(item.value)}
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
                  wrapperClassName="pt-0 mb-2"
                  checked={filterSearchMeta?.priority?.includes(item.value)}
                  data={item}
                  onChange={() => filterChangeHandler('priority', item)}
                />
              ))}
            </div>
          </div>
          <div className="border-base-300 flex w-full justify-end gap-4 border-t p-4">
            <TMButton colors="white" onClick={() => setFilter(false)}>
              Cancel
            </TMButton>
            <TMButton onClick={() => applyFilterHandler()}>
              Apply Filters
            </TMButton>
          </div>
        </div>
      )}
    </div>
  );
};

Filter.propTypes = {
  isMini: PropTypes.bool,
  onFilterChange: PropTypes.func
};

Filter.defaultProps = {
  isMini: false,
  onFilterChange: null
};

export default Filter;
