import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TableVirtuoso } from 'react-virtuoso';
import { ArrowDownIcon, ArrowUpIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import {
  O11yRefTableBody,
  O11yTable,
  O11yTableCell,
  O11yTableRow
} from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import {
  setIsSnPDetailsVisible,
  setShowSnPDetailsFor,
  setSnPCbtInfo
} from 'features/SHTestDetails/slices/dataSlice';
import {
  setIsDetailsVisible,
  setShowDetailsFor
} from 'features/TestDetails/slices/uiSlice';
import { getActiveProject, getProjects } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';

import SHTestItem from '../components/TestItem';
import SHTestsHeader from '../components/TestsHeader';
import { SUITE_TESTS_HEADER_LABEL_MAPPING } from '../constants';
import {
  getSnPTestsData,
  setTestsLoading,
  setTestsSortBy
} from '../slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSnpTests,
  getSnpTestsLoading,
  getSnpTestsPaging,
  getSnpTestsSortBy
} from '../slices/selectors';

// eslint-disable-next-line react/jsx-props-no-spreading
const TableRow = (props) => <O11yTableRow hover {...props} />;

const VTable = (props) => (
  <O11yTable
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...props}
    style={{ borderCollapse: 'separate' }}
    containerWrapperClass="border border-solid border-base-200 rounded-lg"
  />
);

export default function SnPTests() {
  const mounted = useRef(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const projects = useSelector(getProjects);
  const dispatch = useDispatch();
  const filters = useSelector(getAllSnPTestFilters);
  const tests = useSelector(getSnpTests);
  const isLoadingTests = useSelector(getSnpTestsLoading);
  const pagingParams = useSelector(getSnpTestsPaging);
  const sortBy = useSelector(getSnpTestsSortBy);
  const activeProject = useSelector(getActiveProject);

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthTestsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject]);

  const loadMoreRows = () => {
    if (!isLoadingTests && tests.length && pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPTestsData({
          normalisedName: projects.active?.normalisedName,
          pagingParams,
          sortOptions: sortBy,
          filters,
          shouldUpdate: true
        })
      ).finally(() => {
        if (mounted.current) {
          setIsLoadingMore(false);
        }
      });
    }
  };

  useEffect(() => {
    mounted.current = true;
    if (projects.active?.normalisedName) {
      dispatch(setTestsLoading(true));
      dispatch(
        getSnPTestsData({
          normalisedName: projects.active?.normalisedName,
          sortOptions: sortBy,
          filters
        })
      )
        .unwrap()
        .finally(() => {
          dispatch(setTestsLoading(false));
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, filters, projects.active?.normalisedName, sortBy]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const testDetails = searchParams.get('details');
    if (testDetails) {
      dispatch(setIsDetailsVisible(true));
      dispatch(setShowDetailsFor(testDetails));
    }
    return () => {
      dispatch(setIsDetailsVisible(false));
    };
  }, [dispatch]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const snpDetails = searchParams.get(SNP_PARAMS_MAPPING.snpTestDetails);
    if (snpDetails) {
      dispatch(
        setSnPCbtInfo({
          osName: searchParams.get(SNP_PARAMS_MAPPING.snpOsName) || '',
          osVersion: searchParams.get(SNP_PARAMS_MAPPING.snpOsVersion) || '',
          browserName:
            searchParams.get(SNP_PARAMS_MAPPING.snpBrowserName) || '',
          browserVersion:
            searchParams.get(SNP_PARAMS_MAPPING.snpBrowserVersion) || ''
        })
      );
      dispatch(setIsSnPDetailsVisible(true));
      dispatch(setShowSnPDetailsFor(snpDetails));
    }
    return () => {
      dispatch(setIsSnPDetailsVisible(false));
    };
  }, [dispatch]);

  const handleClickSortBy = (val) => {
    const updatedData = { type: val };
    if (val === sortBy.type) {
      updatedData.status = sortBy.status === 'asc' ? 'desc' : 'asc';
    } else {
      updatedData.status = 'desc';
    }
    dispatch(setTestsSortBy(updatedData));
  };

  return (
    <div className={twClassNames('h-full')}>
      <SHTestsHeader handleClickSortBy={handleClickSortBy} sortBy={sortBy} />
      {isLoadingTests ? (
        <O11yLoader
          wrapperClassName="h-full"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      ) : (
        <TableVirtuoso
          style={{ height: '100%' }}
          data={tests}
          endReached={loadMoreRows}
          components={{
            Table: VTable,
            TableRow,
            TableBody: O11yRefTableBody
          }}
          fixedHeaderContent={() => (
            <TableRow>
              {Object.keys(SUITE_TESTS_HEADER_LABEL_MAPPING).map((key, idx) => {
                if (idx > 1) {
                  return (
                    <O11yTableCell
                      key={key}
                      wrapperClassName={twClassNames(
                        SUITE_TESTS_HEADER_LABEL_MAPPING[key].defaultClass
                      )}
                    >
                      <button
                        className="flex w-full items-center justify-center gap-1 "
                        onClick={() => handleClickSortBy(key)}
                        disabled={isLoadingMore}
                        type="button"
                      >
                        <span className="text-xs font-medium leading-4">
                          {SUITE_TESTS_HEADER_LABEL_MAPPING[
                            key
                          ].name.toUpperCase()}
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
                      SUITE_TESTS_HEADER_LABEL_MAPPING[key].defaultClass
                    )}
                  >
                    <div className="text-xs font-medium leading-4">
                      {SUITE_TESTS_HEADER_LABEL_MAPPING[key].name.toUpperCase()}
                    </div>
                  </O11yTableCell>
                );
              })}
            </TableRow>
          )}
          itemContent={(index, testData) => (
            <SHTestItem key={testData.id} testDetails={testData} />
          )}
        />
      )}
    </div>
  );
}
