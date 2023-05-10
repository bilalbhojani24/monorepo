import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowDownIcon, ArrowUpIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import PropTypes from 'prop-types';

import { SUITE_TESTS_HEADER_LABEL_MAPPING } from '../constants';
import { getSnpTestsSortBy } from '../slices/selectors';

const TestsTableHeader = ({ isLoadingMore, handleClickSortBy }) => {
  const sortBy = useSelector(getSnpTestsSortBy);
  return (
    <O11yTableRow>
      {Object.keys(SUITE_TESTS_HEADER_LABEL_MAPPING).map((key, idx) => {
        if (idx > 1) {
          return (
            <O11yTableCell
              key={key}
              wrapperClassName={twClassNames(
                SUITE_TESTS_HEADER_LABEL_MAPPING[key].defaultClass,
                'py-3 border-t border-base-300 z-[2]' // #TODO: Z-INDEX CHANGE
              )}
              isSticky
            >
              <button
                className="flex w-full items-center justify-center gap-1 "
                onClick={() => handleClickSortBy(key)}
                disabled={isLoadingMore}
                type="button"
              >
                <span className="text-xs font-medium leading-4">
                  {SUITE_TESTS_HEADER_LABEL_MAPPING[key].name.toUpperCase()}
                </span>
                {sortBy.type === key && (
                  <>
                    {sortBy.status === 'asc' ? (
                      <ArrowUpIcon className="text-brand-500 inline-block h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="text-brand-500 inline-block h-4 w-4" />
                    )}
                  </>
                )}
              </button>
            </O11yTableCell>
          );
        }
        return (
          <O11yTableCell
            key={key}
            wrapperClassName={twClassNames(
              SUITE_TESTS_HEADER_LABEL_MAPPING[key].defaultClass,
              'py-3 border-t border-base-300 z-[2]' // #TODO: Z-INDEX CHANGE
            )}
            isSticky
          >
            <div className="text-xs font-medium leading-4">
              {SUITE_TESTS_HEADER_LABEL_MAPPING[key].name.toUpperCase()}
            </div>
          </O11yTableCell>
        );
      })}
    </O11yTableRow>
  );
};

TestsTableHeader.propTypes = {
  isLoadingMore: PropTypes.bool.isRequired,
  handleClickSortBy: PropTypes.func.isRequired
};

export default TestsTableHeader;
