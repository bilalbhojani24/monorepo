import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { MdSearchOff, MdUnfoldLess, MdUnfoldMore } from '@browserstack/bifrost';
import { O11yButton } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { API_STATUSES } from 'constants/common';
import { TestListContext } from 'features/BuildDetails/context/TestListContext';
import {
  EMPTY_APPLIED_FILTERS,
  EMPTY_SELECTED_FILTERS,
  EMPTY_STATIC_FILTERS,
  EMPTY_TESTLIST_DATA_STATE
} from 'features/TestList/constants';
import {
  getAppliedFilters,
  getTestList
} from 'features/TestList/slices/selectors';
import {
  getTestListData,
  getTestlistFiltersData,
  setAppliedFilters,
  setSelectedFilters,
  setStaticFilters,
  setTestList
} from 'features/TestList/slices/testListSlice';
import useIsUnmounted from 'hooks/useIsMounted';
import PropTypes from 'prop-types';

import FilterPills from './components/FilterPills';
import RenderChildrens from './components/RenderTestChildrens';
import TestListFilters from './components/TestListFilters';
import TestListSearch from './components/TestListSearch';

const TestList = ({
  buildUUID,
  testDefectTypeMapping,
  updateTestDefectTypeMapping
}) => {
  const dispatch = useDispatch();
  const { isMounted } = useIsUnmounted();
  const [, setSearchParams] = useSearchParams();
  const [expandAll, setExpandAll] = useState(false);
  const invertExpandAll = () => setExpandAll((prevValue) => !prevValue);
  const { data: testListData, apiState: testListDataApiState } =
    useSelector(getTestList);
  const appliedFilters = useSelector(getAppliedFilters);
  const loadFreshData = useCallback(() => {
    dispatch(getTestListData({ buildId: buildUUID, pagingParams: {} }));
  }, [buildUUID, dispatch]);

  const loadMoreData = useCallback(() => {
    if (testListData?.pagingParams?.hasNext) {
      dispatch(
        getTestListData({
          buildId: buildUUID,
          pagingParams: testListData.pagingParams
        })
      );
    }
  }, [buildUUID, dispatch, testListData]);

  const resetReduxStore = useCallback(
    (itemsToReset) => {
      if (itemsToReset.includes('staticFilters')) {
        setStaticFilters({
          data: EMPTY_STATIC_FILTERS,
          apiState: { status: API_STATUSES.idle, details: {} }
        });
      }
      if (itemsToReset.includes('selected')) {
        dispatch(setSelectedFilters(EMPTY_SELECTED_FILTERS));
      }
      if (itemsToReset.includes('applied')) {
        dispatch(setAppliedFilters(EMPTY_APPLIED_FILTERS));
      }
      if (itemsToReset.includes('testList')) {
        dispatch(
          setTestList({
            data: EMPTY_TESTLIST_DATA_STATE,
            apiState: { status: API_STATUSES.idle, details: {} }
          })
        );
      }
    },
    [dispatch]
  );

  const viewAllTests = () => {
    resetReduxStore(['selected', 'applied', 'testList']);
    loadFreshData();
  };

  const testListContextValues = useMemo(
    () => ({
      buildUUID,
      testDefectTypeMapping,
      updateTestDefectTypeMapping
    }),
    [buildUUID, testDefectTypeMapping, updateTestDefectTypeMapping]
  );

  useEffect(() => {
    if (buildUUID) {
      const searchParams = new URLSearchParams(window?.location?.search);
      const transformedAppliedFilters = {
        tab: 'tests'
      };
      Array.from(searchParams).forEach(([key, value]) => {
        if (key === 'search' && value.length) {
          transformedAppliedFilters[key] = value;
        } else if (key === 'isMuted' && value === 'true') {
          transformedAppliedFilters[key] = true;
        } else if (Object.keys(EMPTY_STATIC_FILTERS).includes(key)) {
          transformedAppliedFilters[key] = value.split(',');
        }
      });
      dispatch(setAppliedFilters(transformedAppliedFilters));
      // Onload we dont make a call to load data instead we update applied
      // - filters and its in use effect dependcy which trigger loading of freh data
      dispatch(getTestlistFiltersData({ buildId: buildUUID }));
    }
    return () => {
      resetReduxStore(['selected', 'applied', 'staticFilters', 'testList']);
    };
  }, [dispatch, buildUUID, loadFreshData, resetReduxStore]);

  useEffect(() => {
    // This works only when appliedFilters changes and not on mount but after mounted
    if (isMounted) {
      const transformedAppliedFilters = {
        tab: 'tests'
      };
      Object.keys(appliedFilters).forEach((key) => {
        if (Array.isArray(appliedFilters[key]) && appliedFilters[key]?.length) {
          transformedAppliedFilters[key] = appliedFilters[key]?.join(',');
        } else if (key === 'isMuted' && appliedFilters[key] === true) {
          transformedAppliedFilters[key] = true;
        } else if (key === 'search' && appliedFilters[key].length) {
          transformedAppliedFilters[key] = appliedFilters[key];
        }
      });
      setSearchParams(transformedAppliedFilters);
      dispatch(
        setSelectedFilters({
          ...appliedFilters
        })
      );
      resetReduxStore(['testList']);
      loadFreshData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="border-base-200 flex justify-between border-b px-6 py-4">
        <div className="flex w-full">
          <O11yButton
            isIconOnlyButton
            colors="white"
            variant="minimal"
            wrapperClassName="mr-4"
            icon={
              expandAll ? (
                <MdUnfoldLess className="h-5 w-5" />
              ) : (
                <MdUnfoldMore className="h-5 w-5" />
              )
            }
            onClick={invertExpandAll}
          />
          <TestListSearch />
        </div>
        <div className="flex items-center">
          <TestListFilters />
        </div>
        <div />
      </div>
      <FilterPills viewAllBuilds={viewAllTests} />
      <div className="h-full">
        {testListData?.hierarchy && testListData?.hierarchy?.length !== 0 && (
          <TestListContext.Provider value={testListContextValues}>
            <Virtuoso
              useWindowScroll
              data={testListData?.hierarchy}
              endReached={loadMoreData}
              overscan={20}
              itemContent={(index, data) => (
                <RenderChildrens
                  listOfItems={{ children: [data], type: 'ROOT' }}
                />
              )}
            />
          </TestListContext.Provider>
        )}
        {testListDataApiState.status === API_STATUSES.PENDING && (
          <O11yLoader loaderClass="self-center p-1 my-5" />
        )}
        {testListDataApiState.status === API_STATUSES.FULFILLED &&
          testListData?.hierarchy?.length === 0 && (
            <div className="flex h-full flex-col justify-center">
              <MdSearchOff className="text-base-500 mx-auto h-11 w-11" />
              <h2 className="text-center font-bold">
                No matching results found
              </h2>
              <p className="text-base-500 text-center">
                We couldn&apos;t find the results you were looking for.
              </p>
              <O11yButton
                wrapperClassName="mx-auto mt-6 block"
                onClick={viewAllTests}
              >
                View All Tests
              </O11yButton>
            </div>
          )}
      </div>
    </div>
  );
};

export default TestList;

TestList.propTypes = {
  buildUUID: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  testDefectTypeMapping: PropTypes.object.isRequired,
  updateTestDefectTypeMapping: PropTypes.func.isRequired
};
