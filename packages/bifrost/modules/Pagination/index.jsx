import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon, ArrowLongLeftIcon, ArrowLongRightIcon } from '../Icon';

import './styles.scss';

const getPageRange = (page, totalPages) => {
  if (totalPages.length <= 5) return totalPages;
  let startIndex = 0;
  let endIndex = totalPages.length;
  if ([1, 2].includes(page)) {
    startIndex = 0;
  } else if (totalPages.length === page) {
    startIndex = totalPages.length - 5;
  } else if (totalPages.length - 1 === page) {
    startIndex = totalPages.length - 5;
  } else {
    startIndex = page - 3;
  }
  endIndex = startIndex + 5;
  return totalPages.slice(startIndex, endIndex);
};

const Pagination = (props) => {
  const {
    count,
    pageSize,
    pageNumber,
    onNextClick,
    onPreviousClick,
    onPageNumberClick,
    withNumber,
    isCentered,
    activeLinkClass,
    inActiveLinkClass
  } = props;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const [totalPages, setTotalPages] = useState([]);

  useEffect(() => {
    setTotalPages(getPageRangeNumbers());
  }, [count, pageSize]);

  const getPageRangeNumbers = () => {
    const totalPages = Math.ceil(count / pageSize);
    return Array.from(Array(totalPages).keys(), (item) => item + 1);
  };

  const prevClick = (e) => {
    e.preventDefault();
    if (currentPage > 1) {
      const updatedCurrentPage = currentPage - 1;
      setCurrentPage(updatedCurrentPage);
      if (onPreviousClick) onPreviousClick(updatedCurrentPage);
    }
  };

  const nextClick = (e) => {
    e.preventDefault();
    if (currentPage < totalPages.length) {
      const updatedCurrentPage = currentPage + 1;
      setCurrentPage(updatedCurrentPage);
      if (onNextClick) onNextClick(updatedCurrentPage);
    }
  };

  const pageNumberClick = (e, page) => {
    e.preventDefault();
    setCurrentPage(page);
    if (onPageNumberClick) onPageNumberClick(page);
  };

  const renderNextPrev = () => (
    <div
      className={classNames('flex flex-1 justify-between sm:justify-end', {
        'sm:hidden': withNumber,
        block: !withNumber
      })}
    >
      <a
        href="/"
        className="relative inline-flex items-center rounded-md border border-base-300 bg-white px-4 py-2 text-sm font-medium text-base-700 hover:bg-base-50"
        onClick={prevClick}
      >
        Previous
      </a>
      <a
        href="/"
        className="relative ml-3 inline-flex items-center rounded-md border border-base-300 bg-white px-4 py-2 text-sm font-medium text-base-700 hover:bg-base-50"
        onClick={nextClick}
      >
        Next
      </a>
    </div>
  );

  const renderPageNumber = (inActiveClass, activeClass) => {
    return (
      <>
        {getPageRange(currentPage, totalPages).map((page) => {
          return (
            <a
              key={page}
              href="/"
              aria-label={`page ${page} of ${totalPages.length}`}
              className={classNames(inActiveClass, inActiveLinkClass, {
                [`${activeClass} ${activeLinkClass}`]: currentPage === page
              })}
              onClick={(e) => pageNumberClick(e, page)}
              aria-current="page"
            >
              {page}
            </a>
          );
        })}
      </>
    );
  };

  const centeredPagination = () => {
    return (
      <nav className="flex items-center justify-between border-t border-base-200 px-4 sm:px-0">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="/"
            className="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-base-500 hover:border-base-300 hover:text-base-700"
            onClick={prevClick}
          >
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-base-400" aria-hidden="true" />
            Previous
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          {renderPageNumber(
            'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-base-500 hover:border-base-300 hover:text-base-700',
            'inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600'
          )}
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="/"
            className="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-base-500 hover:border-base-300 hover:text-base-700"
            onClick={nextClick}
          >
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-base-400" aria-hidden="true" />
          </a>
        </div>
      </nav>
    );
  };

  if (isCentered) {
    return centeredPagination();
  }

  return (
    <div
      className="flex items-center justify-between border-t border-base-200 bg-white px-4 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p className={classNames('text-sm text-base-700')}>
          Showing <span className="font-medium">{currentPage * pageSize - pageSize + 1}</span> to{' '}
          <span className="font-medium">{currentPage * pageSize}</span> of <span className="font-medium">{count}</span>{' '}
          results{' '}
        </p>
      </div>
      {renderNextPrev()}
      <nav
        className={classNames('hidden sm:inline-flex isolate  -space-x-px rounded-md shadow-sm', {
          'sm:hidden': !withNumber
        })}
        aria-label="Pagination"
      >
        <a
          href="/"
          className="relative inline-flex items-center rounded-l-md border border-base-300 bg-white px-2 py-2 text-sm font-medium text-base-500 hover:bg-base-50"
          onClick={prevClick}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPageNumber(
          'inline-flex items-center border border-base-300 bg-white px-4 py-2 text-sm font-medium text-base-500 hover:bg-base-50',
          'z-10 border-indigo-500 bg-indigo-50 text-indigo-600'
        )}
        <a
          href="/"
          className="relative inline-flex items-center rounded-r-md border border-base-300 bg-white px-2 py-2 text-sm font-medium text-base-500 hover:bg-base-50"
          onClick={nextClick}
        >
          <span className="sr-only">Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
        </a>
      </nav>
    </div>
  );
};

Pagination.propTypes = {
  activeLinkClass: PropTypes.string,
  count: PropTypes.number,
  inActiveLinkClass: PropTypes.string,
  isCentered: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPageNumberClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  withNumber: PropTypes.bool
};

Pagination.defaultProps = {
  activeLinkClass: '',
  count: 100,
  isCentered: false,
  inActiveLinkClass: '',
  onNextClick: () => {},
  onPageNumberClick: () => {},
  onPreviousClick: () => {},
  pageNumber: 1,
  pageSize: 25,
  withNumber: true
};

export default Pagination;
