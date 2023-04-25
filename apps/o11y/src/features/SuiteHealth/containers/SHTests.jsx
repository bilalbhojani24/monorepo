import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { twClassNames } from '@browserstack/utils';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { SNP_PARAMS_MAPPING } from 'constants/common';
import { getIsFiltersLoading } from 'features/FilterSkeleton/slices/selectors';
import {
  setIsSHTestsDetailsVisible,
  setShowSHTestsDetailsFor,
  setSnPCbtInfo
} from 'features/SHTestDetails/slices/dataSlice';
import SHTestsFilters from 'features/SHTestsFilters';
import { hideTestDetailsDrawer } from 'features/TestDetails/utils';
import { getActiveProject } from 'globalSlice/selectors';
import isEmpty from 'lodash/isEmpty';
import { logOllyEvent } from 'utils/common';

import SHTestItem from '../components/TestItem';
import TestsTableHeader from '../components/TestsTableHeader';
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

export default function SHTests() {
  const mounted = useRef(null);

  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const dispatch = useDispatch();
  const filters = useSelector(getAllSnPTestFilters);
  const tests = useSelector(getSnpTests);
  const isLoadingTests = useSelector(getSnpTestsLoading);
  const pagingParams = useSelector(getSnpTestsPaging);
  const sortBy = useSelector(getSnpTestsSortBy);
  const activeProject = useSelector(getActiveProject);
  const isFiltersLoading = useSelector(getIsFiltersLoading);
  const navigate = useNavigate();

  useEffect(() => {
    logOllyEvent({
      event: 'O11ySuiteHealthTestsVisited',
      data: {
        project_name: activeProject.name,
        project_id: activeProject.id
      }
    });
  }, [activeProject.name, activeProject.id]);

  const loadMoreRows = () => {
    if (!isLoadingTests && tests.length && pagingParams?.hasNext) {
      setIsLoadingMore(true);
      dispatch(
        getSnPTestsData({
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
    if (activeProject?.normalisedName && !isFiltersLoading) {
      dispatch(setTestsLoading(true));
      dispatch(
        getSnPTestsData({
          normalisedName: activeProject?.normalisedName,
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
  }, [
    dispatch,
    filters,
    activeProject?.normalisedName,
    sortBy,
    isFiltersLoading
  ]);

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
            searchParams.get(SNP_PARAMS_MAPPING.snpBrowserVersion) || '',
          osKey: searchParams.get(SNP_PARAMS_MAPPING.snpOsKey) || '',
          browserKey: searchParams.get(SNP_PARAMS_MAPPING.snpBrowserKey) || '',
          deviceKey: searchParams.get(SNP_PARAMS_MAPPING.snpDeviceKeys) || ''
        })
      );
      dispatch(setIsSHTestsDetailsVisible(true));
      dispatch(setShowSHTestsDetailsFor(snpDetails));
    }
    return () => {
      dispatch(setIsSHTestsDetailsVisible(false));
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

  const handleClickTestItem = (currentIndex) => {
    const activeRow = tests?.[currentIndex];
    if (activeRow) {
      dispatch(
        setSnPCbtInfo({
          osName: '',
          osVersion: '',
          browserName: '',
          browserVersion: '',
          deviceName: '',
          osKey: '',
          browserKey: '',
          deviceKey: ''
        })
      );
      dispatch(hideTestDetailsDrawer());
      dispatch(setShowSHTestsDetailsFor(activeRow.id));
      dispatch(setIsSHTestsDetailsVisible(true));
      const searchParams = new URLSearchParams(window?.location?.search);
      searchParams.set(SNP_PARAMS_MAPPING.snpTestDetails, activeRow.id);
      navigate({ search: searchParams.toString() });
    }
  };

  return (
    <div className={twClassNames('flex flex-col h-full overflow-hidden')}>
      <div className={twClassNames('mb-4 px-6 pt-5')}>
        <SHTestsFilters />
      </div>
      {isLoadingTests ? (
        <O11yLoader wrapperClassName="flex-1" />
      ) : (
        <>
          {isEmpty(tests) ? (
            <div
              className={twClassNames(
                'flex items-center justify-center flex-1'
              )}
            >
              <EmptyPage text="No data found" />
            </div>
          ) : (
            <div className="flex-1 overflow-auto px-6">
              <VirtualisedTable
                style={{ height: '100%' }}
                data={tests}
                endReached={loadMoreRows}
                fixedHeaderContent={() => (
                  <TestsTableHeader
                    isLoadingMore={isLoadingMore}
                    handleClickSortBy={handleClickSortBy}
                  />
                )}
                itemContent={(index, testData) => (
                  <SHTestItem key={testData.id} testDetails={testData} />
                )}
                showFixedFooter={isLoadingMore}
                handleRowClick={handleClickTestItem}
                tableWrapperClassName="border border-t-0 border-base-300 bg-white shadow ring-1 ring-black/5 border-separate border-spacing-0"
                tableContainerWrapperClassName="border-none overflow-visible overflow-x-visible bg-transparent ring-0 shadow-none rounded-none"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
