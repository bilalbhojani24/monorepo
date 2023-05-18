import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Virtuoso } from 'react-virtuoso';
import { MdSearchOff } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { API_STATUSES, TEST_DETAILS_SOURCE } from 'constants/common';
import { getBuildMeta } from 'features/BuildDetails/slices/selectors';
import {
  getAllAppliedFilters,
  getIsFiltersLoading
} from 'features/FilterSkeleton/slices/selectors';
import { getSearchStringFromFilters } from 'features/FilterSkeleton/utils';
import TestDetails from 'features/TestDetails';
import {
  EMPTY_TESTLIST_DATA_STATE,
  TESTLIST_TYPES
} from 'features/TestList/constants';
import { TestListContext } from 'features/TestList/context/TestListContext';
import { getTestList } from 'features/TestList/slices/selectors';
import {
  getTestListData,
  setTestList
} from 'features/TestList/slices/testListSlice';
import TestListFilters from 'features/TestListFilters';
import { getActiveProject } from 'globalSlice/selectors';
import useIsUnmounted from 'hooks/useIsMounted';
import PropTypes from 'prop-types';
import { logOllyEvent } from 'utils/common';

import RenderRootItem from './components/RenderRootItem';

const TestList = ({
  buildUUID,
  testDefectTypeMapping,
  updateTestDefectTypeMapping,
  updateTestScrollPos,
  testListScrollPos,
  scrollIndexMapping,
  updateScrollIndexMapping
}) => {
  const dispatch = useDispatch();
  const { isMounted } = useIsUnmounted();
  const [expandAll, setExpandAll] = useState(true);
  const [closedAccordionIds, setClosedAccordionIds] = useState({});
  const buildMeta = useSelector(getBuildMeta);
  const activeProject = useSelector(getActiveProject);
  const virtuosoRef = useRef(null);
  const navigate = useNavigate();
  const appliedFilters = useSelector(getAllAppliedFilters);
  const isFiltersLoading = useSelector(getIsFiltersLoading);

  const OllyTestListingEvent = useCallback(
    (eventName, data = {}) => {
      logOllyEvent({
        event: eventName,
        data: {
          project_name: activeProject.name,
          project_id: activeProject.id,
          build_name: buildMeta.data?.name,
          build_uuid: buildMeta.data?.uuid,
          ...data
        }
      });
    },
    [
      activeProject.id,
      activeProject.name,
      buildMeta.data?.name,
      buildMeta.data?.uuid
    ]
  );

  const o11yTestListingInteraction = useCallback(
    (interaction) => {
      OllyTestListingEvent('O11yTestListingInteracted', {
        interaction
      });
    },
    [OllyTestListingEvent]
  );

  const invertExpandAll = useCallback(() => {
    if (expandAll) {
      o11yTestListingInteraction('collapse_all');
    } else {
      o11yTestListingInteraction('expand_all');
    }
    setExpandAll((prevValue) => !prevValue);
  }, [expandAll, o11yTestListingInteraction]);

  const { data: testListData, apiState: testListDataApiState } =
    useSelector(getTestList);
  const loadFreshData = useCallback(
    () => dispatch(getTestListData({ buildId: buildUUID, pagingParams: {} })),
    [buildUUID, dispatch]
  );

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

  useEffect(() => {
    navigate({
      search: getSearchStringFromFilters(appliedFilters).toString()
    });
  }, [appliedFilters, navigate]);

  const resetReduxStore = useCallback(
    (itemsToReset) => {
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
    navigate({
      search: 'tab=tests'
    });
    resetReduxStore(['selected', 'applied', 'testList']);
  };

  const testListContextValues = useMemo(
    () => ({
      buildUUID,
      testDefectTypeMapping,
      updateTestDefectTypeMapping,
      expandAll,
      closedAccordionIds,
      setClosedAccordionIds,
      o11yTestListingInteraction,
      scrollIndexMapping,
      updateScrollIndexMapping,
      invertExpandAll
    }),
    [
      expandAll,
      buildUUID,
      testDefectTypeMapping,
      updateTestDefectTypeMapping,
      closedAccordionIds,
      setClosedAccordionIds,
      o11yTestListingInteraction,
      scrollIndexMapping,
      updateScrollIndexMapping,
      invertExpandAll
    ]
  );

  useEffect(() => {
    if (isMounted) {
      OllyTestListingEvent('O11yTestListingVisited', {
        filters_applied: window.location.search.replace('?tab=tests', '')
          ? window.location.search.replace('?', '').split('&').join(',')
          : 'none'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMounted]);

  const isFiltersApplied = useMemo(
    () => appliedFilters.length > 0,
    [appliedFilters]
  );

  useEffect(() => {
    // This works only when appliedFilters changes and not on mount but after mounted
    if (isMounted) {
      resetReduxStore(['testList']);
      if (!isFiltersLoading) {
        loadFreshData();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, isFiltersLoading]);

  useEffect(() => {
    setClosedAccordionIds((data) => {
      const updatedData = {};
      Object.keys(data).forEach((key) => {
        if (data[key].type === TESTLIST_TYPES.ROOT) {
          updatedData[key] = {
            ...data[key],
            status: expandAll
          };
        } else {
          updatedData[key] = { ...data[key] };
        }
      });
      return updatedData;
    });
  }, [expandAll]);

  useEffect(() => {
    if (virtuosoRef.current) {
      setTimeout(() => {
        virtuosoRef.current.scrollTo({
          top: testListScrollPos,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [testListScrollPos]);

  return (
    <>
      <div className="flex h-full flex-col bg-white">
        <TestListContext.Provider value={testListContextValues}>
          <TestListFilters buildUUID={buildUUID} />
          {testListData?.hierarchy && testListData?.hierarchy?.length !== 0 && (
            <Virtuoso
              ref={virtuosoRef}
              style={{ zIndex: 0 }}
              data={testListData?.hierarchy}
              endReached={loadMoreData}
              overscan={20}
              itemContent={(index, data) => <RenderRootItem data={data} />}
              onScroll={(e) => {
                updateTestScrollPos(e.target.scrollTop);
              }}
            />
          )}
        </TestListContext.Provider>
        {testListDataApiState.status === API_STATUSES.PENDING && (
          <O11yLoader loaderClass="self-center p-1 my-5" />
        )}
        {testListDataApiState.status === API_STATUSES.FULFILLED &&
          testListData?.hierarchy?.length === 0 && (
            <div className="flex h-full flex-col justify-center">
              <O11yEmptyState
                title={
                  isFiltersApplied
                    ? 'No matching results found'
                    : 'No tests found'
                }
                description={
                  isFiltersApplied
                    ? "We couldn't find the results you were looking for."
                    : 'No tests were detected in the current build, which could be attributed to its ongoing execution.'
                }
                mainIcon={
                  <MdSearchOff className="text-base-500 inline-block h-12 w-12" />
                }
                buttonProps={
                  isFiltersApplied
                    ? {
                        children: ' View All Tests',
                        onClick: viewAllTests,
                        size: 'default'
                      }
                    : null
                }
              />
            </div>
          )}
      </div>
      <TestDetails source={TEST_DETAILS_SOURCE.TESTS_LISTING} />
    </>
  );
};

export default React.memo(TestList);

TestList.propTypes = {
  buildUUID: PropTypes.string.isRequired,
  testDefectTypeMapping: PropTypes.objectOf(PropTypes.number).isRequired,
  updateTestDefectTypeMapping: PropTypes.func.isRequired,
  updateTestScrollPos: PropTypes.func.isRequired,
  testListScrollPos: PropTypes.number.isRequired,
  updateScrollIndexMapping: PropTypes.func.isRequired,
  scrollIndexMapping: PropTypes.objectOf(PropTypes.any).isRequired
};
