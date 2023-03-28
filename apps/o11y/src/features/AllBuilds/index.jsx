import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import { MdSearchOff } from '@browserstack/bifrost';
import { O11yButton, O11yTableCell, O11yTableRow } from 'common/bifrostProxy';
import EmptyPage from 'common/EmptyPage';
import O11yLoader from 'common/O11yLoader';
import VirtualisedTable from 'common/VirtualisedTable';
import { API_STATUSES } from 'constants/common';
import { getActiveProject } from 'globalSlice/selectors';
import { logOllyEvent } from 'utils/common';
import { getBuildPath } from 'utils/routeUtils';

import BuildCardDetails from './components/BuildCardDetails';
import Filters from './components/Filters';
import FilterPills from './components/Filters/FilterPills';
import SearchBuilds from './components/SearchBuilds';
import {
  getBuildsData,
  setAppliedFilters,
  setBuilds,
  setFiltersMetaData,
  setSelectedFilters
} from './slices/dataSlice';
import {
  getAppliedFilters,
  getBuilds,
  getBuildsApiState,
  getBuildsPagingParams
} from './slices/selectors';
import { getParamsFromFiltersObject } from './utils/common';
import {
  EMPTY_APPLIED_FILTERS,
  EMPTY_METADATA_FILTERS,
  EMPTY_SELECTED_FILTERS
} from './constants';

const AllBuildsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const activeProject = useSelector(getActiveProject);
  const { projectNormalisedName } = useParams();
  const [, setSearchParams] = useSearchParams();
  const buildsData = useSelector(getBuilds);
  const appliedFilters = useSelector(getAppliedFilters);
  const buildsPagingParamsData = useSelector(getBuildsPagingParams);
  const { status: buildsApiStatus } = useSelector(getBuildsApiState);

  const resetReduxStore = useCallback(
    (itemsToReset) => {
      if (itemsToReset.includes('selected'))
        dispatch(setSelectedFilters(EMPTY_SELECTED_FILTERS));
      if (itemsToReset.includes('applied'))
        dispatch(setAppliedFilters(EMPTY_APPLIED_FILTERS));
      if (itemsToReset.includes('buildsData'))
        dispatch(setBuilds({ builds: [], buildsPagingParams: {} }));
      if (itemsToReset.includes('metaData')) {
        dispatch(setFiltersMetaData(EMPTY_METADATA_FILTERS));
      }
    },
    [dispatch]
  );

  const viewAllBuilds = useCallback(() => {
    resetReduxStore(['selected', 'applied', 'buildsData']);
    dispatch(
      getBuildsData({
        projectNormalisedName,
        currentPagingParams: {}
      })
    );
  }, [dispatch, projectNormalisedName, resetReduxStore]);

  const loadFreshBuildsData = useCallback(() => {
    dispatch(
      getBuildsData({
        projectNormalisedName,
        currentPagingParams: {}
      })
    );
  }, [dispatch, projectNormalisedName]);

  const loadBuildsData = () => {
    if (buildsPagingParamsData.hasNext) {
      dispatch(
        getBuildsData({
          projectNormalisedName,
          currentPagingParams: buildsPagingParamsData
        })
      );
    }
  };

  useEffect(() => {
    logOllyEvent({
      event: 'O11yBuildListingVisited',
      project_name: activeProject.name,
      project_id: activeProject.id,
      url: window.location.href
    });
  }, [pathname, activeProject]);

  useEffect(
    () => () => {
      // Clean builds on project change
      resetReduxStore(['selected', 'applied', 'buildsData', 'metaData']);
    },
    [dispatch, resetReduxStore, projectNormalisedName]
  );

  useEffect(() => {
    const filtersParams = getParamsFromFiltersObject(appliedFilters);
    setSearchParams(filtersParams);
    dispatch(
      setSelectedFilters({
        ...appliedFilters
      })
    );
    resetReduxStore(['buildsData']);
    loadFreshBuildsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters]);

  const handleClickBuildItem = (currentIdx) => {
    const build = buildsData[currentIdx];
    navigate(
      getBuildPath(
        projectNormalisedName,
        build?.normalisedName,
        build?.buildNumber
      )
    );
  };

  return (
    <div className="flex h-full flex-col">
      <div className="border-base-300 border-b px-8 py-5">
        <h1 className="text-2xl font-bold leading-6">All builds</h1>
      </div>

      <div className="flex flex-1 flex-col py-6 px-8">
        <div className="mb-2 flex justify-between">
          <SearchBuilds />
          <Filters />
        </div>
        <div className="mb-4">
          <FilterPills viewAllBuilds={viewAllBuilds} />
        </div>
        {buildsApiStatus === API_STATUSES.FAILED && (
          <EmptyPage
            heading="Unable to fetch data"
            text="Something went wrong while fetching builds data"
          />
        )}
        {buildsData.length === 0 && buildsApiStatus === API_STATUSES.PENDING ? (
          <O11yLoader loaderClass="self-center p-1 my-5" />
        ) : null}
        {buildsData.length === 0 &&
        buildsApiStatus === API_STATUSES.FULFILLED ? (
          <div className="m-auto">
            <MdSearchOff className="text-base-500 mx-auto h-11 w-11" />
            <h2 className="text-center font-bold">No matching results found</h2>
            <p className="text-base-500 text-center">
              We couldn&apos;t find the results you were looking for.
            </p>
            <O11yButton
              wrapperClassName="mx-auto mt-6 block"
              onClick={viewAllBuilds}
            >
              View All Builds
            </O11yButton>
          </div>
        ) : null}
        {!!buildsData.length && (
          <VirtualisedTable
            data={buildsData}
            endReached={loadBuildsData}
            showFixedFooter={buildsApiStatus === API_STATUSES.PENDING}
            itemContent={(index, singleBuildData) => (
              <BuildCardDetails
                key={singleBuildData.uuid}
                data={singleBuildData}
              />
            )}
            fixedHeaderContent={() => (
              <O11yTableRow>
                <O11yTableCell wrapperClassName="py-3">BUILD</O11yTableCell>
                <O11yTableCell wrapperClassName="py-3">TESTS</O11yTableCell>
                <O11yTableCell wrapperClassName="py-3">DURATION</O11yTableCell>
                <O11yTableCell wrapperClassName="py-3">
                  FAILURE CATEGORIES
                </O11yTableCell>
                <O11yTableCell wrapperClassName="py-3">
                  SMART TAGS
                </O11yTableCell>
              </O11yTableRow>
            )}
            handleRowClick={handleClickBuildItem}
          />
        )}
      </div>
    </div>
  );
};

export default AllBuildsPage;
