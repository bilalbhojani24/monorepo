import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { ArrowDownIcon, ArrowUpIcon } from '@browserstack/bifrost';
import { twClassNames } from '@browserstack/utils';
import { O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import {
  setIsSnPErrorDetailsVisible,
  setShowSnPErrorDetailsFor
} from 'features/SHErrorDetails/slices/dataSlice';
import {
  setIsDetailsVisible,
  setShowDetailsFor
} from 'features/TestDetails/slices/uiSlice';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';

import SHTestsHeader from '../components/TestsHeader';
import {
  UNIQUE_ERROR_MAIN_HEADER,
  UNIQUE_ERROR_MAIN_HEADER_STYLES
} from '../constants';
import {
  getSnPErrorsData,
  setErrorsLoading,
  setErrorsSortBy
} from '../slices/dataSlice';
import {
  getAllSnPTestFilters,
  getSHDataErrors,
  getSnpErrorsLoading,
  getSnpErrorsPaging,
  getSnpErrorsSortBy
} from '../slices/selectors';

import UniqueErrorRow from './UniqueErrorRow';

const SnPUniqueErrors = () => {
  const mounted = useRef(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector(getAllSnPTestFilters);
  const errors = useSelector(getSHDataErrors);
  const isLoadingErrors = useSelector(getSnpErrorsLoading);
  const pagingParams = useSelector(getSnpErrorsPaging);
  const sortBy = useSelector(getSnpErrorsSortBy);
  const activeProject = useSelector(getActiveProject);
  // const navigate = useNavigate();

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthErrorsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject.name, activeProject.id]);

  const loadMoreRows = () => {
    if (!isLoadingErrors && errors.length && pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPErrorsData({
          normalisedName: activeProject?.normalisedName,
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
    if (activeProject?.normalisedName) {
      dispatch(setErrorsLoading(true));
      dispatch(
        getSnPErrorsData({
          normalisedName: activeProject?.normalisedName,
          sortOptions: sortBy,
          filters
        })
      )
        .unwrap()
        .finally(() => {
          dispatch(setErrorsLoading(false));
        });
    }
    return () => {
      mounted.current = false;
    };
  }, [dispatch, filters, activeProject?.normalisedName, sortBy]);

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
    const snpErrorId = searchParams.get(SNP_PARAMS_MAPPING.snpErrorId);
    const snpErrorTestId = searchParams.get(SNP_PARAMS_MAPPING.snpErrorTestId);

    if (snpErrorId && snpErrorTestId) {
      // dispatch(
      //   setSnPCbtInfo({
      //     osName: searchParams.get(SNP_PARAMS_MAPPING.snpOsName) || '',
      //     osVersion: searchParams.get(SNP_PARAMS_MAPPING.snpOsVersion) || '',
      //     browserName:
      //       searchParams.get(SNP_PARAMS_MAPPING.snpBrowserName) || '',
      //     browserVersion:
      //       searchParams.get(SNP_PARAMS_MAPPING.snpBrowserVersion) || ''
      //   })
      // );
      dispatch(setIsSnPErrorDetailsVisible(true));
      dispatch(
        setShowSnPErrorDetailsFor({
          errorId: snpErrorId,
          testId: snpErrorTestId
        })
      );
    }
    return () => {
      dispatch(setIsSnPErrorDetailsVisible(false));
    };
  }, [dispatch]);

  const handleClickSortBy = (val) => {
    const updatedData = { type: val };
    if (val === sortBy.type) {
      updatedData.status = sortBy.status === 'asc' ? 'desc' : 'asc';
    } else {
      updatedData.status = 'desc';
    }
    dispatch(setErrorsSortBy(updatedData));
  };

  // const handleClickTestItem = (currentIndex) => {
  //   const activeRow = errors?.[currentIndex];
  //   if (activeRow) {
  //     dispatch(
  //       setSnPCbtInfo({
  //         osName: '',
  //         osVersion: '',
  //         browserName: '',
  //         browserVersion: '',
  //         deviceName: ''
  //       })
  //     );
  //     dispatch(setIsSnPErrorDetailsVisible(false));
  //     dispatch(setShowSnPErrorDetailsFor(activeRow.id));
  //     dispatch(setIsDetailsVisible(true));
  //     const searchParams = new URLSearchParams(window?.location?.search);
  //     searchParams.delete('details');
  //     searchParams.set(SNP_PARAMS_MAPPING.snpTestDetails, activeRow.id);
  //     navigate({ search: searchParams.toString() });
  //   }
  // };
  return (
    <div className={twClassNames('flex flex-col h-full')}>
      <SHTestsHeader handleClickSortBy={handleClickSortBy} sortBy={sortBy} />
      {isLoadingErrors ? (
        <O11yLoader
          wrapperClassName="flex-1"
          loaderClass="text-base-200 fill-base-400 w-8 h-8"
        />
      ) : (
        <>
          {isEmpty(errors) ? (
            <div
              className={twClassNames(
                'flex items-center justify-center flex-1'
              )}
            >
              <EmptyPage text="No data found" />
            </div>
          ) : (
            <div className="flex-1">
              <VirtualisedTable
                style={{ height: '100%' }}
                data={errors}
                endReached={loadMoreRows}
                fixedHeaderContent={() => (
                  <O11yTableRow>
                    <O11yTableCell wrapperClassName="p-0 first:pl-0 sm:first:pl-0 last:pr-0 sm:last:pr-0">
                      <div className="flex w-full items-center">
                        <div
                          className={twClassNames(
                            'text-xs font-medium leading-4',
                            UNIQUE_ERROR_MAIN_HEADER_STYLES.error
                          )}
                        >
                          {UNIQUE_ERROR_MAIN_HEADER.error}
                        </div>
                        <div
                          className={twClassNames(
                            'text-xs font-medium leading-4',
                            UNIQUE_ERROR_MAIN_HEADER_STYLES.testCount
                          )}
                        >
                          {UNIQUE_ERROR_MAIN_HEADER.testCount}
                        </div>
                        <button
                          className={twClassNames(
                            'flex items-center justify-center gap-1',
                            UNIQUE_ERROR_MAIN_HEADER_STYLES.errorCount
                          )}
                          onClick={() =>
                            handleClickSortBy(
                              Object.keys(UNIQUE_ERROR_MAIN_HEADER)[2]
                            )
                          }
                          disabled={isLoadingMore}
                          type="button"
                        >
                          <span className="text-xs font-medium leading-4">
                            {UNIQUE_ERROR_MAIN_HEADER.errorCount}
                          </span>
                          {sortBy.type ===
                            Object.keys(UNIQUE_ERROR_MAIN_HEADER)[2] && (
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
                    </O11yTableCell>
                  </O11yTableRow>
                )}
                itemContent={(index, data) => <UniqueErrorRow data={data} />}
                showFixedFooter={isLoadingMore}
                // handleRowClick={handleClickTestItem}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SnPUniqueErrors;
