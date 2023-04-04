import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowDownIcon, ArrowUpIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import { UNIQUE_ERROR_MAIN_HEADER } from '../constants';
import { getSnpErrorsSortBy } from '../slices/selectors';

const UETableHeader = ({ handleClickSortBy, isLoadingMore }) => {
  const sortBy = useSelector(getSnpErrorsSortBy);
  return (
    <div className="border-base-300 bg-base-50 flex w-full items-center rounded-t-md border pl-4 pr-6 sm:pl-6">
      <div className={twClassNames(UNIQUE_ERROR_MAIN_HEADER.error.headerClass)}>
        <span className="text-base-500 text-xs font-medium uppercase leading-4">
          {UNIQUE_ERROR_MAIN_HEADER.error.label}
        </span>
      </div>
      <button
        className={twClassNames(
          'text-left',
          UNIQUE_ERROR_MAIN_HEADER.testCount.headerClass
        )}
        onClick={() =>
          handleClickSortBy(UNIQUE_ERROR_MAIN_HEADER.testCount.key)
        }
        disabled={isLoadingMore}
        type="button"
      >
        <span className="text-base-500 mr-1 text-xs font-medium uppercase leading-4">
          {UNIQUE_ERROR_MAIN_HEADER.testCount.label}
        </span>
        {sortBy.type === UNIQUE_ERROR_MAIN_HEADER.testCount.key && (
          <>
            {sortBy.status === 'asc' ? (
              <ArrowUpIcon className="text-brand-500 inline-block h-4 w-4" />
            ) : (
              <ArrowDownIcon className="text-brand-500 inline-block h-4 w-4" />
            )}
          </>
        )}
      </button>
      <button
        className={twClassNames(
          'text-left',
          UNIQUE_ERROR_MAIN_HEADER.errorCount.headerClass
        )}
        onClick={() =>
          handleClickSortBy(UNIQUE_ERROR_MAIN_HEADER.errorCount.key)
        }
        disabled={isLoadingMore}
        type="button"
      >
        <span className="text-base-500 mr-1 text-xs font-medium uppercase leading-4">
          {UNIQUE_ERROR_MAIN_HEADER.errorCount.label}
        </span>
        {sortBy.type === UNIQUE_ERROR_MAIN_HEADER.errorCount.key && (
          <>
            {sortBy.status === 'asc' ? (
              <ArrowUpIcon className="text-brand-500 inline-block h-4 w-4" />
            ) : (
              <ArrowDownIcon className="text-brand-500 inline-block h-4 w-4" />
            )}
          </>
        )}
      </button>
    </div>
  );
};

UETableHeader.propTypes = {
  handleClickSortBy: PropTypes.func.isRequired,
  isLoadingMore: PropTypes.bool.isRequired
};

export default UETableHeader;
