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
    priorityOptions,
    priorityValueAndNameMapTC,
    priorityValueAndIntNameMapTC,
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

  const priorityOptionsForFilter = priorityOptions?.map((item) => {
    switch (priorityValueAndIntNameMapTC[item?.value]) {
      case 'critical':
        return {
          value: item?.value,
          label: (
            <>
              <KeyboardDoubleArrowUpOutlinedIcon className="text-danger-700 mr-1" />{' '}
              Critical
            </>
          )
        };
      case 'high':
        return {
          value: item?.value,
          label: (
            <>
              <ArrowUpwardOutlinedIcon className="text-danger-500 mr-1" /> High
            </>
          )
        };
      case 'medium':
        return {
          value: item?.value,
          label: (
            <>
              <RemoveOutlinedIcon className="text-brand-500 mr-1" /> Medium
            </>
          )
        };
      case 'low':
        return {
          value: item?.value,
          label: (
            <>
              <ArrowDownwardOutlinedIcon className="text-success-500 mr-1" />{' '}
              Low
            </>
          )
        };

      default:
        return {
          value: item?.value,
          label: <>{priorityValueAndNameMapTC?.[item?.value]}</>
        };
    }
  });

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
          placeholder="Search by Test Case ID or Title"
          value={filterSearchMeta?.q}
          // onFocus={handleSearchFocus}
          onChange={(e) => searchChangeHandler(e.currentTarget.value)}
          onKeyDown={(e) => onSubmitKeyHandler(e, () => applyFilterHandler())}
          addOnBeforeInline={<SearchIcon className="text-base-400" />}
          isTrailingNodeClickable
          addOnAfterInline={
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
          className="absolute right-0 top-full w-full max-w-[calc(100%-2px)] rounded-md bg-white drop-shadow-lg"
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
                  addOnBeforeInline={<SearchIcon className="text-base-400" />}
                />
              </div>
              <div className="mt-4 h-full w-full overflow-y-auto pl-1 pt-1">
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
                    checked={filterSearchMeta?.owner?.includes(item.value)}
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
                  addOnBeforeInline={<SearchIcon className="text-base-400" />}
                />
              </div>
              <div className="mt-4 h-full w-full overflow-y-auto pl-1 pt-1">
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
            <div className="h-80 w-1/5">
              <div className="text-brand-800 mb-2 text-base font-medium">
                Filter By Priority
              </div>
              <div className="h-full w-full overflow-y-auto p-1">
                {priorityOptionsForFilter?.map((item) => (
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
          </div>
          <div className="border-base-300 flex w-full justify-end gap-4 border-t p-4">
            <TMButton colors="white" onClick={() => setFilter(false)}>
              Cancel
            </TMButton>
            <TMButton onClick={() => applyFilterHandler(null, true)}>
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
