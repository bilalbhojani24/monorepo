import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { MdErrorOutline } from '@browserstack/bifrost';
import { O11yEmptyState } from 'common/bifrostProxy';
import O11yLoader from 'common/O11yLoader';
import { API_STATUSES, PUSHER_EVENTS } from 'constants/common';
import { FILTER_CATEGORIES } from 'features/FilterSkeleton/constants';
import {
  resetFilters,
  setIsDirtyByCategory,
  setIsLoadingBuildsFilters
} from 'features/FilterSkeleton/slices/filterSlice';
import TestList from 'features/TestList';
import { EMPTY_TESTLIST_DATA_STATE } from 'features/TestList/constants';
import {
  getTestListData,
  resetTestListSlice,
  setTestList
} from 'features/TestList/slices/testListSlice';
import TestInsightsLayout from 'features/TestsInsights/containers/TestInsightsLayout';

import BuildDetailsHeader from '../components/BuildDetailsHeader';
import BuildDetailsStateHandler from '../components/BuildDetailsStateHandler';
import { TABS } from '../constants';
import {
  clearBuildUUID,
  getBuildIdFromBuildInfo,
  setActiveTab
} from '../slices/buildDetailsSlice';
import { getBuildDetailsActiveTab, getBuildUUID } from '../slices/selectors';

function BuildDetails() {
  const [loadError, setLoadError] = useState(false);
  const [isLoadingNewTests, setIsLoadingNewTests] = useState(false);
  const [testDefectTypeMapping, setTestDefectTypeMapping] = useState({});
  const [updateCount, setUpdateCount] = useState(0);
  const buildUUID = useSelector(getBuildUUID);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = useSelector(getBuildDetailsActiveTab);
  const fetchBuildId = useCallback(() => {
    setLoadError(false);
    const normalisedData = {
      projectNormalisedName: encodeURI(params.projectNormalisedName),
      buildNormalisedName: encodeURI(params.buildNormalisedName),
      buildSerialId: params.buildSerialId
    };
    dispatch(getBuildIdFromBuildInfo(normalisedData))
      .unwrap()
      .catch(() => {
        setLoadError(true);
      });
  }, [
    dispatch,
    params.buildNormalisedName,
    params.buildSerialId,
    params.projectNormalisedName
  ]);
  const testListScrollPos = useRef(0);
  const scrollIndexMapping = useRef({});

  useEffect(() => {
    fetchBuildId();
  }, [fetchBuildId]);

  useEffect(
    () => () => {
      dispatch(resetTestListSlice());
      dispatch(resetFilters());
      dispatch(clearBuildUUID());
      setTestDefectTypeMapping({});
      dispatch(
        setActiveTab({
          id: TABS.insights.id,
          idx: 0
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('tab')) {
      const tabValue = searchParams.get('tab');
      const activeIndex = Object.keys(TABS).findIndex(
        (item) => item === tabValue
      );
      dispatch(
        setActiveTab({
          id: tabValue,
          idx: activeIndex
        })
      );
    }
  }, [dispatch, location.search]);

  const updateTestDefectTypeMapping = useCallback((data, bulk = false) => {
    if (bulk) {
      const formattedData = {};
      data.forEach((item) => {
        formattedData[item.id] = { ...item };
      });
      setTestDefectTypeMapping((prev) => ({
        ...prev,
        ...formattedData
      }));
    } else {
      setTestDefectTypeMapping((prev) => ({
        ...prev,
        [data.id]: {
          ...data
        }
      }));
    }
  }, []);

  useEffect(() => {
    const unSubscribe = window.pubSub.subscribe(
      PUSHER_EVENTS.ANALYZER_COMPLETED,
      (payload) => {
        if (payload?.data?.length && payload.buildId === buildUUID) {
          updateTestDefectTypeMapping(payload.data, true);
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [buildUUID, updateTestDefectTypeMapping]);

  useEffect(() => {
    const unSubscribe = window.pubSub.subscribe(
      PUSHER_EVENTS.NEW_TESTS,
      (data) => {
        if (buildUUID === data.buildId) {
          setUpdateCount((prev) => prev + data?.updatesCount || 0);
        }
      }
    );
    return () => {
      unSubscribe();
    };
  }, [buildUUID]);

  // [START] Test list scroll positioning handling
  const updateTestScrollPos = useCallback((pos) => {
    testListScrollPos.current = pos;
  }, []);

  const updateScrollIndexMapping = useCallback((data) => {
    scrollIndexMapping.current[data.id] = data;
  }, []);
  // [END]Test list scroll positioning handling

  const onUpdateBtnClick = useCallback(() => {
    setIsLoadingNewTests(true);
    dispatch(
      setTestList({
        data: EMPTY_TESTLIST_DATA_STATE,
        apiState: { status: API_STATUSES.idle, details: {} }
      })
    );
    dispatch(getTestListData({ buildId: buildUUID, pagingParams: {} }))
      .unwrap()
      .finally(() => {
        setIsLoadingNewTests(false);
        setUpdateCount(0);
      });
  }, [buildUUID, dispatch]);

  const applyTestListFilter = useCallback(
    ({ query, clearOnly = false }) => {
      if (query || clearOnly) {
        dispatch(resetTestListSlice());
        testListScrollPos.current = 0;
        scrollIndexMapping.current = {};
        dispatch(setIsLoadingBuildsFilters(true));
        dispatch(
          setIsDirtyByCategory({
            category: FILTER_CATEGORIES.TEST_LISTING,
            status: true
          })
        );
      }
      if (!clearOnly) {
        const searchString = `?tab=tests&${query}`;
        navigate({ search: searchString });
      }
    },
    [dispatch, navigate]
  );

  if (!buildUUID) {
    return (
      <div className="bg-base-50 flex h-screen w-full items-center justify-center">
        {loadError ? (
          <div className="border-base-300 flex h-72 w-full max-w-xl items-center justify-center rounded-md border">
            <O11yEmptyState
              title="Something went wrong!"
              description="Unable to load build details"
              mainIcon={
                <MdErrorOutline className="text-danger-600 inline-block !h-12 !w-12" />
              }
              buttonProps={{
                children: 'Reload',
                onClick: fetchBuildId,
                size: 'default'
              }}
            />
          </div>
        ) : (
          <O11yLoader text="Loading details" />
        )}
      </div>
    );
  }
  return (
    <>
      <BuildDetailsHeader
        isNewItemLoading={isLoadingNewTests}
        onUpdateBtnClick={onUpdateBtnClick}
        updateCount={(activeTab.id === TABS.tests.id && updateCount) || 0}
        applyTestListFilter={applyTestListFilter}
      />

      <BuildDetailsStateHandler>
        {activeTab.id === TABS.insights.id && (
          <TestInsightsLayout applyTestListFilter={applyTestListFilter} />
        )}
        {activeTab.id === TABS.tests.id && (
          <TestList
            buildUUID={buildUUID}
            testDefectTypeMapping={testDefectTypeMapping}
            updateTestDefectTypeMapping={updateTestDefectTypeMapping}
            updateTestScrollPos={updateTestScrollPos}
            testListScrollPos={testListScrollPos.current}
            scrollIndexMapping={scrollIndexMapping.current}
            updateScrollIndexMapping={updateScrollIndexMapping}
          />
        )}
      </BuildDetailsStateHandler>
    </>
  );
}

export default BuildDetails;
