import React, { useCallback, useEffect, useState } from 'react';
import { twClassNames } from '@browserstack/utils';
import PropTypes from 'prop-types';

import Button from '../Button';
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '../Icon';

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

const buttonClass =
  'text-base-500 pt-4 hover:border-base-300 hover:text-base-700 inline-flex items-center border-t-2 border-transparent text-sm font-medium';

const Pagination = (props) => {
  const {
    count,
    defaultPageNumber,
    pageSize,
    pageNumber,
    onNextClick,
    onPreviousClick,
    onPageNumberClick,
    withNumber,
    isCentered,
    activeLinkClass,
    inActiveLinkClass,
    hideDetailsString
  } = props;
  const [currentPage, setCurrentPage] = useState(defaultPageNumber);

  const [totalPages, setTotalPages] = useState([]);

  const getPageRangeNumbers = useCallback(() => {
    const totalPagesPageNumbers = Math.ceil(count / pageSize);
    return Array.from(Array(totalPagesPageNumbers).keys(), (item) => item + 1);
  }, [count, pageSize]);

  useEffect(() => {
    setTotalPages(getPageRangeNumbers());
  }, [count, pageSize, getPageRangeNumbers]);

  useEffect(() => {
    if (pageNumber) setCurrentPage(pageNumber);
  }, [pageNumber]);

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
      className={twClassNames('flex flex-1 justify-between sm:justify-end', {
        'sm:hidden': withNumber,
        block: !withNumber
      })}
    >
      <Button onClick={prevClick} colors="white" disabled={currentPage === 1}>
        Previous
      </Button>
      <Button
        wrapperClassName="ml-3"
        onClick={nextClick}
        colors="white"
        disabled={currentPage === totalPages[totalPages.length - 1]}
      >
        Next
      </Button>
    </div>
  );

  const renderPageNumber = (inActiveClass, activeClass) => (
    <>
      {getPageRange(currentPage, totalPages).map((page) => (
        <a
          key={page}
          href="/"
          aria-label={`page ${page} of ${totalPages.length}`}
          className={twClassNames(inActiveClass, inActiveLinkClass, {
            [`${activeClass} ${activeLinkClass}`]: currentPage === page
          })}
          onClick={(e) => pageNumberClick(e, page)}
          aria-current="page"
        >
          {page}
        </a>
      ))}
    </>
  );

  const centeredPagination = () => (
    <nav className="border-base-200 flex items-center justify-between border-t px-0">
      <div className="-mt-px flex w-0 flex-1">
        <a
          href="/"
          className={`${buttonClass} pr-1`}
          onClick={prevClick}
          disabled={currentPage === 1}
        >
          <ArrowLongLeftIcon
            className="text-base-400 mr-3 h-5 w-5"
            aria-hidden="true"
          />
          Previous
        </a>
      </div>
      <div className="hidden md:-mt-px md:flex">
        {renderPageNumber(
          'inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-base-500 hover:border-base-300 hover:text-base-700',
          'inline-flex items-center border-t-2 border-brand-500 px-4 pt-4 text-sm font-medium text-brand-600'
        )}
      </div>
      <div className="-mt-px flex w-0 flex-1 justify-end">
        <a
          href="/"
          className={`${buttonClass} pl-1`}
          onClick={nextClick}
          disabled={currentPage === totalPages[totalPages.length - 1]}
        >
          Next
          <ArrowLongRightIcon
            className="text-base-400 ml-3 h-5 w-5"
            aria-hidden="true"
          />
        </a>
      </div>
    </nav>
  );

  if (isCentered) {
    return centeredPagination();
  }

  return (
    <div
      className="border-base-200 flex items-center justify-between border-t px-0 py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="hidden sm:block">
        <p
          className={twClassNames('text-sm text-base-700', {
            hidden: hideDetailsString
          })}
        >
          Showing{' '}
          <span className="font-medium">
            {currentPage * pageSize - pageSize + 1}
          </span>{' '}
          to{' '}
          <span className="font-medium">
            {totalPages.length === currentPage ? count : currentPage * pageSize}
          </span>{' '}
          of <span className="font-medium">{count}</span> results{' '}
        </p>
      </div>
      {renderNextPrev()}
      <nav
        className={twClassNames(
          'hidden sm:inline-flex isolate  -space-x-px rounded-md shadow-sm',
          {
            'sm:hidden': !withNumber
          }
        )}
        aria-label="Pagination"
      >
        <a
          href="/"
          className="border-base-300 text-base-500 hover:bg-base-50 relative inline-flex items-center rounded-l-md border  p-2 text-sm font-medium"
          onClick={prevClick}
        >
          <span className="sr-only">Previous</span>
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
        </a>
        {renderPageNumber(
          'inline-flex items-center border border-base-300  px-4 py-2 text-sm font-medium text-base-500 hover:bg-base-50',
          'z-10 border-brand-500 text-brand-600'
        )}
        <a
          href="/"
          className="border-base-300 text-base-500 hover:bg-base-50 relative inline-flex items-center rounded-r-md border  p-2 text-sm font-medium"
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
  defaultPageNumber: PropTypes.number,
  inActiveLinkClass: PropTypes.string,
  isCentered: PropTypes.bool,
  onNextClick: PropTypes.func,
  onPageNumberClick: PropTypes.func,
  onPreviousClick: PropTypes.func,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  withNumber: PropTypes.bool,
  hideDetailsString: PropTypes.bool
};

Pagination.defaultProps = {
  activeLinkClass: '',
  count: 100,
  defaultPageNumber: 1,
  isCentered: false,
  inActiveLinkClass: '',
  onNextClick: () => {},
  onPageNumberClick: () => {},
  onPreviousClick: () => {},
  pageNumber: undefined,
  pageSize: 25,
  withNumber: true,
  hideDetailsString: false
};

export default Pagination;
